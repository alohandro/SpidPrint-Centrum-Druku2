// server.js - Сервер для обработки платежей через Stripe
const express = require('express');
const stripe = require('stripe')('sk_live_Ваш_Секретный_Ключ');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { cart, address } = req.body;
        
        const lineItems = cart.map(item => ({
            price_data: {
                currency: 'pln',
                product_data: {
                    name: item.name + ' (' + item.size + ')',
                },
                unit_amount: item.price * 100,
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'https://yourdomain.com/success',
            cancel_url: 'https://yourdomain.com/cancel',
            shipping_address_collection: {
                allowed_countries: ['PL'],
            },
            metadata: {
                address: address,
            }
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
