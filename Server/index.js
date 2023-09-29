const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51NvCqjSDHABHXCN4xI5Q0Yn910NaBMuLKLyI0KNflCrk2hsA07p1lwo26iIVbvsuo3r3RbnuCZEwCZESUzW1j3zY00z0nh6puH');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/products/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: 'Invalid products data' });
    }

    const finalProducts = products?.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: finalProducts,
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred on the server' });
  }
});

app.listen(7000, () => {
  console.log('Server is listening on http://localhost:7000/');
});
