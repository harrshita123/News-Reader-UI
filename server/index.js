const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user.js');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/user");

const JWT_SECRET = "YOUR_SECRET_KEY_HERE";

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json("Invalid token");
        req.user = decoded; 
        next();
    });
};

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.json("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({ email, password: hashedPassword });

        res.json("User registered successfully");
    } catch (err) {
        res.status(500).json("Server error");
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.json("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.json("Incorrect Email or Password");

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: "lax",
        });

        res.json("Successfully Logged in");
    } catch (err) {
        res.status(500).json("Server error");
    }
});

app.get('/me', requireAuth, async (req, res) => {
    const user = await userModel.findById(req.user.id).select("-password");
    res.json(user);
});

app.post('/logout', (req, res) => {
    res.clearCookie("token");
    res.json("Logged out");
});

app.listen(3001, () => console.log("Server running"));
