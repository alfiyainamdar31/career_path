# NeuroCareers

A brain-dominance based career guidance platform for 10th (SSC), 12th (HSC), and graduate students. Users take an adaptive quiz, receive a brain dominance profile, and get ranked career matches with full roadmaps covering subjects, entrance exams, and future scope.

## Project structure

```
brain-career-guide/
  backend/    Express + MongoDB API + NodeJs
  frontend/   React + Vite client
```

## Backend setup

```
cd backend
npm install
cp .env   # fill in MongoDB, JWT, Gmail SMTP and Stripe values
node seed.js           # populates questions, careers and test users
node server.js
```

### Email OTP (registration verification)

The backend sends a 6-digit verification code by email at registration using Gmail SMTP via Nodemailer. To enable this:

1. Enable 2-Step Verification on the Gmail account used to send mail.
2. Generate an App Password at https://myaccount.google.com/apppasswords.
3. Set `EMAIL_USER` to the Gmail address and `EMAIL_APP_PASSWORD` to the generated 16-character password in `.env`.

### Subscription pricing

Plan pricing is defined in `backend/routes/payment.js` inside the `PLANS` object. Update the `amount` field (in cents) for `PREMIUM_MONTHLY` or `PREMIUM_LIFETIME` to change pricing; the change is reflected automatically in checkout sessions and the public `/api/payment/plans` endpoint.

### Test accounts

After running `npm run seed`, the following accounts are available (password `Test@123` for all):

| Email                      | Plan             | Verified | Notes                                    |
| -------------------------- | ---------------- | -------- | ---------------------------------------- |
| aarav.free@test.com        | FREE             | Yes      | 10th grade, hasn't taken the quiz yet    |
| priya.monthly@test.com     | PREMIUM_MONTHLY  | Yes      | 12th Science, quiz completed             |
| rohan.lifetime@test.com    | PREMIUM_LIFETIME | Yes      | 12th Commerce, quiz completed            |
| sneha.arts@test.com        | FREE             | Yes      | 12th Arts, quiz completed                |
| karan.graduate@test.com    | PREMIUM_MONTHLY  | Yes      | Graduate, quiz completed                 |
| ananya.unverified@test.com | FREE             | No       | Used to test the email verification flow |

## Frontend setup

```
cd frontend
npm install
cp .env.example .env   # set VITE_API_URL if not using the default
npm run dev
```

## Key features

- Email OTP verification required at registration, with resend support
- Adaptive quiz that filters questions by academic level (10th, 12th, graduate)
- Stream-aware career matching that boosts relevance for the student's chosen stream
- Career Explorer with full text search and category, stream, and tier filters
- Career detail pages with a step-by-step roadmap, subjects, exams and future scope
- Stripe checkout for monthly and lifetime premium plans, with webhook-based activation
