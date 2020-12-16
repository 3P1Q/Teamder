const GitHubStrategy = require( 'passport-github2' ).Strategy;
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const User = require("../models/profileModel");
// const findOrCreate = require('mongoose-findorcreate');
const router = express.Router();


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/teamder",
    proxy: true,
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    User.findOrCreate({ githubId: profile.id, }, function (err, user,created) {
      // return done(err, user);
      console.log(user);
      console.log(created);
      console.log(profile._json.html_url);
      if(created===true){
        User.updateOne({ githubId: profile.id, },{
            username: profile.username, 
            profilePic: profile._json.avatar_url,
            name: profile.displayName, 
            description: profile._json.bio.length > 100 ? profile._json.bio.substring(0,100) : profile._json.bio,
            '$set' : {'social.github': profile._json.html_url }
          },(err) => {console.log(err)
        });
        user.username = profile.username;
      }
      // social: {$set : {github: profile._json.html_url}}
      return done(err, user);
    });
  }
));

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/auth/google/teamder",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(profile);

//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

router.get("/",
  passport.authenticate('github', { scope: ["user:email"] })
);

router.get("/hackanect",
  passport.authenticate('github', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    // res.send("Github Authentication Done");
    // console.log(req.user);
    res.redirect(`/github/login/${req.user.username}`);
  });

  module.exports= router;