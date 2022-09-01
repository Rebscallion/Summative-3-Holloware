// Setting up our dependencies
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
// passes information from the frontend to the backend
const bodyParser = require("body-parser");
// This is our middleware for talking to mongoDB
const mongoose = require("mongoose");
// bcrypt for encrypting data (passwrords)
const bcrypt = require('bcryptjs');
const config = require("./config.json");

// Schemas
const Products = require("./models/products.js");
const Users = require("./models/users.js");

// -----Start Dependencies-----
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// -----Start Server-----
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// -----Connect to MongoDB-----
mongoose
    .connect(
        `mongodb+srv://${config.username}:${config.password}@mycluster.mc6676s.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log(`You've connected to MongoDB!`);
    })
    .catch((err) => {
        console.log(`DB connection error ${err.message}`);
    });
