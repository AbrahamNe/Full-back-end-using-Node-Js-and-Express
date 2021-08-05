const mongoose = require("mongoose");
const User = mongoose.model("User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = function (req, res) {
  console.log("Registering a user");

  let username = req.body.username;
  let name = req.body.name;
  let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  User.create({
    username: username,
    name: name,
    password: password,
  },
    function (user, err) {
     if(err){
         console.log(err);
         res.status(400).json(err);
     } else{
         console.log("User created ", user);
         res.status(200).json(user);
     }
    })
};

module.exports.login = function (req, res) {
    console.log("user login .......");
    let user = req.body.user;
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ 
        username: username
    }). exec(function(err, user) {
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
        if(user && bcrypt.compareSync(password, user.password)){
            console.log("use found: ", user);
            let token = jwt.sign({name:user.name}, "cs572",{expiresIn:3600});
            res.status(200).json({sucess:true, token:token}); 
        } else{
            console.log("user not found ", user);
            res.status(400).json("unauthorized");
        }
    })
};

module.exports.authenticate = function(req, res, next){
    const headerExists = req.headers.authorization;

    if(headerExists){
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "cs572", function(err, decoded) {
            if(err){
                console.log(err);
                res.status(400).json("Unathorized");
            } else{
                req.user = decoded.username;
                next();
            }
        });

    } else{
        res.status(401).json("no token provided");
    }
    
}