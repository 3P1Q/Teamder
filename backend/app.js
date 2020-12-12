//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash");

const mongoose = require('mongoose');

const session = require('express-session');
const passport = require("passport");

const cors = require('cors');
const path= require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));

const buildPath = path.join(__dirname, '../teamder', 'build');
app.use(express.static(buildPath));

// app.use(
//   cors({
//     origin: "http://localhost:3000", // allow to server to accept request from different origin
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true // allow session cookie from browser to pass through
//   })
// );
// Set up sessions
app.use(session({
    secret: "The Tinder for Techies.",
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

// Session setup complete






// mongoDB Connection
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
// mongoDB connection finished

const updateHackathon = require('./routes/Hackathon/updateHackathon');
updateHackathon();
setInterval(updateHackathon, 43200000); // every 12 hours


const User = require("./models/profileModel");
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/*Routes Config*/

const indexRoute = require("./routes/index");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const googleAuth = require("./routes/googleAuth");
const githubAuth = require("./routes/githubAuth");
const editProfile = require("./routes/editProfile");
const getAllData = require('./routes/getAllData');
const getUserData = require('./routes/getUserData');
const isLoggedIn = require('./routes/isLoggedin');
const similarUsers = require('./routes/ML/similarusers');
const hackathons = require('./routes/getHackathons');
const myHackathons = require('./routes/getMyHackathons');
const addHackathon = require('./routes/addMyHackathon');
const createNewChat = require('./routes/createNewChat');
const updateChat = require('./routes/updateChat');
const getChats = require('./routes/getChats');
const getCurrentChat = require('./routes/getCurrentChat');
const getProfilePictures = require('./routes/getProfilePictures');
const { Schema } = require("mongoose");

/*-----Routes Config End------*/


/*App Config*/

app.use("/",indexRoute);
app.use("/login",loginRoute);
app.use("/register",registerRoute);
app.use("/auth/google", googleAuth);
app.use("/auth/github", githubAuth);
app.use("/profile/edit", editProfile);
app.use("/getalldata", getAllData);
app.use("/getuserdata",getUserData);
app.use("/loggedin", isLoggedIn);
app.use("/similarusers", similarUsers);
app.use("/hackathons", hackathons);
app.use("/myhackathons", myHackathons);
app.use("/addmyhackathon", addHackathon);
app.use("/newchat",createNewChat);
app.use("/updatechat", updateChat);
app.use("/getchats", getChats);
app.use("/getcurrentchat", getCurrentChat);
app.use("/getprofilepictures", getProfilePictures);

/*------App Config End--------*/



app.listen(port, function(){
    console.log("Server started locally at port 5000");
});

