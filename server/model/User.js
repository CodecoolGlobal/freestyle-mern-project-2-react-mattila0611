const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    username: String,
    email: String,
    password: String,
    playedGames: [{score: Number, questions: Number, playedAt: Date}],
    registeredAt: Date
})

const User = mongoose.model("User", userSchema);

module.exports = User;