const express = require("express");
require("dotenv").config();
require("./api/data/dbconnection");
const router = require("./api/router/router");

const app = express();
app.set("port", process.env.port);

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
})

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use("/api", router);

const server =app.listen(process.env.PORT, function(){
    console.log("PORT running on "+ server.address().port);
})