const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const User = require("../models/profileModel");
// const findOrCreate = require('mongoose-findorcreate');
const router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/teamder",
    // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    proxy: true
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id}, function (err, user, created) {
      if(created===true){
        User.updateOne({ googleId: profile.id, },
          {username: profile.email, 
          profilePic: profile.picture,
          name: profile.displayName},
          (err) => {console.log(err)
        });
        user.username = profile.email;
      }
      return cb(err, user);
    });
  }
));

router.get("/",
  passport.authenticate('google', { scope: ["profile","email"] })
);

router.get("/hackanect",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    // res.send("Google Authentication Done");
    console.log(req.user);
    res.redirect(`/google/login/${req.user.username}`);
  });

  module.exports= router;