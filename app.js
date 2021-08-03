const express = require("express");
// calls when the function starts its not a call back
require("dotenv").config();
require("./api/data/dbconnection");
const router = require("./api/router/router");
const path = require("path");

const app = express();
app.set("port", process.env.port);

// this call back added to pending call back queue
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
})

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use("/api", router);

// hocking 
const server =app.listen(process.env.PORT, function(){
    console.log("PORT running on "+ server.address().port);
})