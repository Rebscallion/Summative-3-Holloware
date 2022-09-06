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

//grab our config file  
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

// ====================
//       ADD Method
// ====================

app.post(`/addProduct`, (req, res) => {
    const newProduct = new Products({
        _id: new mongoose.Types.ObjectId(),
        image_url: req.body.image_url,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });
    newProduct
        .save()
        .then((result) => {
            console.log(`Added a new product successfully!`);
            res.send(result);
        })
        .catch((err) => {
            console.log(`Error: ${err.message}`);
        });
});

//------------------------
//GET METHOD
//------------------------
app.get('/allProducts', (req, res) => {
    Products.find()
    .then(result => {
        //send the result of the search to the fontend
        res.send(result)
    })
});


//------------------------
     //REGISTER USERS 
//------------------------

//register a new user on mongoDB

app.post('/registerUser',(req, res)=>{
    // Checking if user is in the DB already
    Users.findOne({username:req.body.username}, (err, userResult)=>{
        if(userResult){
            res.send('username already exists');
        } else {
            const hash = bcrypt.hashSync(req.body.password); // Encrypt User Password
            const user = new Users({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                profile_img_url: req.body.profile_img_url
            });
            user.save().then(result=>{
               // Save to database and notify userResult 
               res.send(result);
            }).catch(err=>res.send(err));
        } //end of else statement 
    })
}) //end of register user 

//------------------------
     //LOGGING IN  
//------------------------
app.post('/loginUser', (req, res)=>{
    //look for a user with the username
    Users.findOne({username:req.body.username}, (err, userResult) => {
        if(userResult){
            if(bcrypt.compareSync(req.body.password, userResult.password)) {
                res.send(userResult);
            } else {
                res.send('not authorised');
            } 
        } else {
            res.send('user not found'); 
        }
    })
        .then(result => {
            //send the result of the search to the fontend
            res.send(result)
        })
});