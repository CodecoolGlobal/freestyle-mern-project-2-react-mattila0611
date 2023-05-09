require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const User = require("./model/User");

const app = express();

const {MONGO_URL} = process.env;

mongoose.connect(MONGO_URL);

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
  }

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    next();
});
app.use(express.json());

app.post("/api/register", async (req, res) => {
    const usernameFound = await User.findOne({ username: req.body.username });
    const emailFound = await User.findOne({ email: req.body.email });

    if (usernameFound) {
        res.json("username exists").status(500);
    } else if (emailFound) {
        res.json("email exists").status(500);
    } else {
        try {
            User.create({
                name: {
                    first: req.body.firstName,
                    last: req.body.lastName
                },
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                registeredAt: Date.now()
            })
            res.json("ok").status(201);
        } catch (error) {
            console.error(error.message);
            res.sendStatus(500);
        }
    }
})

app.post("/api/login", async (req, res) => {
    const usernameFound = await User.findOne({ username: req.body.username });

    if (usernameFound) {
        if (bcrypt.compareSync(req.body.password, usernameFound.password)) {
            res.json({success: true, user: usernameFound});
        } else {
            res.json("Incorrect password!");
        }
    } else {
        res.json("Username doesn't exist!").status(500);
    }
})

app.post("/api/user/:username/addgame", async (req,res) => {
    try{
        const user = await User.findOne({username: req.params.username});
        const newGame = {
            score: req.body.score,
            questions: req.body.questions,
            playedAt: Date.now()
        }
        user.playedGames.push(newGame);
        user.save();
        res.sendStatus(201);
    } catch (error){
        console.error(error.message);
        res.sendStatus(500);
    }
})

app.delete("/api/deleteall", async (req, res) => {
    try {
        const response = await User.deleteMany({});
        res.sendStatus(200);
    } catch (e) {
        console.error(e.message);
        res.sendStatus(500);
    }
})

app.get("/api/users", async (req,res) => {
    try {
        const response = await User.find({});
        res.json(response)
    } catch (e) {
        console.error(e.message);
        res.sendStatus(500);
    }
})

app.get("/api/spot/:id", async (req,res) => {
    try {
        const users = await User.find({});
        const scores = users.map(user => {return {id: user._id, score: user.playedGames.reduce((total, obj) => total + obj.score, 0)}});
        const userSpot = scores.findIndex(item => item.id.toString() === req.params.id);
        res.json(userSpot + 1);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.patch("/user/:username", (req,res) => {
    User.findOneAndUpdate({username: req.params.username}, {username: req.body.username, password: req.body.password}, {new: true})
    .then(result => res.status(200).json(result))
    .catch(error => console.error(error))
})


app.listen(3001, async () => {
    console.log("Listening on port 3001");
})