const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ---------------------------------------------------------------------
// Subscription plan configuration.
// Update the amounts below (in cents) to change pricing across the app.
// "interval: null" indicates a one-time lifetime purchase.
// ---------------------------------------------------------------------
const PLANS = {
  PREMIUM_MONTHLY: {
    name: "Premium Monthly",
    description:
      "Full access to career matches, roadmaps and resources, billed monthly",
    amount: 499, // $4.99 per month -- change this value to update monthly price
    currency: "usd",
    interval: "month",
  },
  PREMIUM_LIFETIME: {
    name: "Premium Lifetime",
    description: "One-time payment for lifetime access to all premium features",
    amount: 999, // $9.99 one-time -- change this value to update lifetime price
    currency: "usd",
    interval: null,
  },
};

// @route   POST /api/payment/create-checkout-session
// @desc    Create a Stripe checkout session for the chosen plan
// @access  Private
// Body: { plan: "PREMIUM_MONTHLY" | "PREMIUM_LIFETIME" }
router.post("/create-checkout-session", protect, async (req, res) => {
  try {
    const { plan } = req.body;
    const planConfig = PLANS[plan];

    if (!planConfig) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan",
      });
    }

    const user = await User.findById(req.user._id);

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user._id.toString() },
      });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const priceData = {
      currency: planConfig.currency,
      product_data: {
        name: `NeuroCareers - ${planConfig.name}`,
        description: planConfig.description,
      },
      unit_amount: planConfig.amount,
    };

    if (planConfig.interval) {
      priceData.recurring = { interval: planConfig.interval };
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{ price_data: priceData, quantity: 1 }],
      mode: planConfig.interval ? "subscription" : "payment",
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/results`,
      metadata: {
        userId: user._id.toString(),
        plan,
      },
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment session creation failed",
      error: error.message,
    });
  }
});

// @route   GET /api/payment/plans
// @desc    Return the public-facing plan details for the pricing UI
// @access  Public
router.get("/plans", (req, res) => {
  res.json({
    success: true,
    plans: Object.entries(PLANS).map(([key, value]) => ({
      id: key,
      name: value.name,
      description: value.description,
      amount: value.amount,
      currency: value.currency,
      interval: value.interval,
    })),
  });
});

// @route   POST /api/payment/webhook
// @desc    Handle Stripe webhook events to activate subscriptions
// @access  Public (verified via Stripe signature)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { userId, plan } = session.metadata;

        const update = {
          isPremium: true,
          subscriptionPlan: plan,
        };

        if (plan === "PREMIUM_MONTHLY") {
          // Subscription renews monthly; expiry tracked via Stripe,
          // set an initial 30-day window as a fallback reference.
          update.subscriptionExpiresAt = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          );
        } else {
          update.subscriptionExpiresAt = null;
        }

        await User.findByIdAndUpdate(userId, update);
        break;
      }

      case "invoice.payment_succeeded": {
        // Extend monthly subscription on successful renewal
        const invoice = event.data.object;
        const customerId = invoice.customer;
        const user = await User.findOne({ stripeCustomerId: customerId });
        if (user && user.subscriptionPlan === "PREMIUM_MONTHLY") {
          user.subscriptionExpiresAt = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          );
          user.isPremium = true;
          await user.save();
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const user = await User.findOne({ stripeCustomerId: customerId });
        if (user) {
          user.isPremium = false;
          user.subscriptionPlan = "FREE";
          user.subscriptionExpiresAt = null;
          await user.save();
        }
        break;
      }

      default:
        break;
    }

    res.json({ received: true });
  },
);

module.exports = router;
