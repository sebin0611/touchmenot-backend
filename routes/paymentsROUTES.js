import express from 'express';


const router = express.Router();
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const line_items = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
        description: product.description,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router
