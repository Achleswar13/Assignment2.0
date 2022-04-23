const mongoose = require('mongoose');
const controller = require('./controllers/homecontroller');
const express = require("express");
const handle = require("express-handlebars");
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
const app = express();
router = express.Router();
require("dotenv").config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
    { useUnifiedTopology: true }).then(() => console.log('Mongo Database is connected to the Server'));

app.set("port",process.env.PORT || 3000);
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.get("/home", controller.books);
app.get("/books/:bookID", controller.detail);
app.engine('.ejs', handle.engine({ defaultLayout: 'style', extname: '.ejs', }));
app.set('view engine', '.ejs');
app.use("/",router); 

app.get("/addNewBook",controller.new);
app.get("/deleteABook",controller.deleteABook);
app.post("/create",controller.create,controller.redirectView);
app.delete("/book/:id/delete",controller.delete,controller.redirectView);

app.listen(app.get("port"), () => {
    console.log('Running on port 3000');
});

