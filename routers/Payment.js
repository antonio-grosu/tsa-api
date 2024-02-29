const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { name, price, description, userId, courseId } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: name,
              description: description,
              // images: ["http://localhost:5000/images/product-image.jpg"],
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "https://the-software-academy.com/success",
      cancel_url: "https://the-software-academy.com/cancel",
      metadata: {
        UserId: userId,
        courseId: courseId,
      },
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
