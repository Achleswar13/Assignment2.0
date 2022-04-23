const mongoose = require("mongoose"),

booksSchema = mongoose.Schema({bookNumber: Number,bookName: String,author: String,link: String,});

module.exports = mongoose.model("Book",booksSchema);