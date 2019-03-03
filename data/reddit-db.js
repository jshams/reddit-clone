/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

const url = process.env.MONGODB_URL || "mongodb://localhost/reddit-db";

mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true }, function (err) {
        if (err)
            console.log(err);
        else
            console.log("Successfully connected to the local Database.");
    });

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
// cpmmented line below allows us to display debug info from Mongoose in the console:
// mongoose.set("debug", true);

module.exports = mongoose.connection;
