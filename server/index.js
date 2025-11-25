const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./models/user.js')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post('/register', async (req, res) => {
    userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
})
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email: email, password: password});
    if(user){
      if(user.password === password){
        res.json("Successfully Logged in");
        } else {
        res.json("Incorrect Email or Password");
    } 
    }else{
        res.json("User not found");
    }
})
app.listen(3001, () => {
    console.log("Server is running");
})