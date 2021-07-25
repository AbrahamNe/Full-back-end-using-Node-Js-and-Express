const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
    name:{ type:String, required: true},
    location: {
       coordinates: {type: [Number], index: "2dsphere"} }
 });


const bookSchema = mongoose.Schema({
  title: { type:String, required:true },
  isbn:{type:String, required:true},
  pageCount:{type:Number, required:false},
  publishedDate:Date,
  Description:{type: String, required:false},
  authors:  { type: [String] },
  categories: String,
  publisher:  publisherSchema
  
});

mongoose.model("Book", bookSchema);
