const book = require('../models/book');
const web = require('../models/book');
module.exports = {
  books: (req, res) => {
    web.find().lean().then((books) => { res.render('home', { books }); }).catch(() => {
    })
  },
  detail: (req, res) => {
    web.findOne({ _id: req.params.bookID }).lean().then((book) => { res.render('books', { book: book }); }).catch(() => {

    })
  },

  deleteABook: (req, res) => {
    web.find().lean().then((books) => { res.render('delete', { books }); }).catch(() => {
    })
  },
  
  index: (req, res) => {
    web.find({})
      .then(book => {
        res.render("users/index", {
          book: book
        })

      })
      .catch(error => {
        console.log('Error fetching users: ${error.message}')
        res.redirect("/home");
      });
  },
  new: (req, res) => {
    res.render("add");
  },
  create: (req, res, next) => {
    let params = {
      
      bookName: req.body.bookName,
      author: req.body.author,
      link: req.body.link
    };
    web.create(params)
      .then(book => {
        res.locals.redirect = "/home";
        res.locals.book = book;
        next();
      })
      .catch(error => {
        console.log(`Error saving books: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  delete: (req, res, next) => {
    let bookID = req.params.id;
    web.findByIdAndDelete({_id:bookID})
      .then(() => {
        res.locals.redirect = "/home";
        next();
      })
      .catch(error => {
        console.log(`Error deleting book by Book Name: ${error.message}`);
        next();
      });
  }
};