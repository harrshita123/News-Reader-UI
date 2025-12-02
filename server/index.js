const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const userModel = require('./models/user.js')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            email,
            password: hashedPassword
        });

        res.json("User registered successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json("Server error");
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json("User not found");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json("Incorrect Email or Password");
        }

        res.json("Successfully Logged in");

    } catch (err) {
        console.log(err);
        res.status(500).json("Server error");
    }
});

app.listen(3001, () => {
    console.log("Server is running");
})
