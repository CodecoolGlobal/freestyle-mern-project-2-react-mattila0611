const express = require('express');
const mongoose = require('mongoose');

const User = require("./model/User");

const app = express();

mongoose.connect("mongodb+srv://butyok:butyok@cluster0.sp2t3v5.mongodb.net/quiz");

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
                password: req.body.password,
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
        if (usernameFound.password === req.body.password) {
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

app.patch("/user/:username", (req,res) => {
    User.findOneAndUpdate({username: req.params.username}, {username: req.body.username, password: req.body.password}, {new: true})
    .then(result => res.status(200).json(result))
    .catch(error => console.error(error))
})
app.listen(3001)