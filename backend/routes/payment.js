const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/create-checkout-session", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Create Stripe customer if not exists
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user._id.toString(),
        },
      });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Brain Career Guide - Premium Access",
              description:
                "Unlock all career matches, skill gap analysis, and personalized roadmap",
              images: ["https://your-domain.com/preview-image.png"], // image url
            },
            unit_amount: 999, // $9.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/results`,
      metadata: {
        userId: user._id.toString(),
      },
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({
      success: false,
      message: "Payment session creation failed",
      error: error.message,
    });
  }
});

// @route   POST /api/payment/webhook
// @desc    Handle Stripe webhook events
// @access  Public (but verified with signature)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.error("STRIPE_WEBHOOK_SECRET is not set");
        return res.status(500).send("Webhook secret not configured");
      }
      
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object;
          const userId = session.metadata.userId;
          
          if (!userId) {
            console.error("No userId found in session metadata");
            return res.status(400).send("Missing userId in metadata");
          }

          // Update user to premium
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isPremium: true },
            { new: true }
          );

          if (!updatedUser) {
            console.error(`User ${userId} not found`);
            return res.status(404).send("User not found");
          }

          console.log(`User ${userId} upgraded to premium successfully`);
          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error("Error processing webhook event:", err);
      res.status(500).send("Error processing webhook");
    }
  }
);

module.exports = router;
