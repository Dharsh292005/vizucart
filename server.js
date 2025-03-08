const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define Customer Schema
const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    cart: [{ productId: String, name: String, price: Number, quantity: Number }]
});

const Customer = mongoose.model('Customer', CustomerSchema);

// Define Product Schema
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String
});

const Product = mongoose.model('Product', ProductSchema);

// API Route to Save Cart
app.post('/api/save-cart', async (req, res) => {
    const { name, email, address, cart } = req.body;

    if (!name || !email || !address || !cart.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const customer = new Customer({ name, email, address, cart });
        await customer.save();
        res.status(201).json({ message: "Cart saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// API Route to Get Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
