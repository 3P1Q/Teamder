const express = require("express");
const passport = require("passport");
const User = require("../models/profileModel");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to getalldata");
});

router.post("/", (req,res) => {
    // console.log(req);
//    if(req.user){
       User.find({}, function(err, users)
       {
           console.log(users);
           res.send(users);
       })
//    }else{
//        res.send("Not Authenticated");
//    }
});

module.exports = router;
