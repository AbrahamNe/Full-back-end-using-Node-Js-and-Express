const mongoose = require("mongoose");
require("dotenv").config();
require("../schema/schema");
require("../schema/userschema");

const dbURL = process.env.DB_URL + process.env.DB_NAME;

mongoose.connect(dbURL, {useNewUrlParser:true, useUnifiedTopology:true});
//mongoose.connect(dbURL);

//
mongoose.connection.on("connected", function(){
    // its a call back , executed when its connection is on
    console.log("Connected to "+ dbURL);
});

mongoose.connection.on("disconnected", ()=>{
    console.log("disconnected");
});

mongoose.connection.on("error",(err)=>{
    console.log("connection error "+ err);
});


process.on("SIGINT", function(){
    mongoose.connection.close( function(){
        console.log("disconnected by app termination");
        process.exit(0);
    });
});

process.once("SIGUSR2", function() {
    mongoose.connection.close(function() {
    console.log("Mongoose disconnected by app termination");
    process.kill(process.pid, "SIGUSR2");
    });
});