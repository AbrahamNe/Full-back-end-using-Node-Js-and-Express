const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
    name:{ type:String, required: true},
    location: { type:{type: String},
       coordinates: {type: [Number],index: "2dsphere"} }
 });


const bookSchema = mongoose.Schema({
  title: { type:String, required:true },
  isbn:String,
  pageCount:Number,
  publishedDate:Date,
  Description: String,
  authors:  { type: [String] },
  category: String,
  publisher:  publisherSchema
  
});

mongoose.model("Book", bookSchema);
