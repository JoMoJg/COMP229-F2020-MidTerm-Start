// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('server/views/books/index.ejs', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('server/views/books/details.ejs', {
//book details
    title: 'Add Book',

    book: {},

  });
  });

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  let book = new Book({
//process
    title: req.body.title,

    author: req.body.author,

    genre: req.body.genre,

    read: req.body.read,

  });
//save info
  book.save(function(err) {

    if (err) {

      console.log(err);

      return;

    } else {

      res.redirect('server/views/books/details.ejs');

    }

  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, function(err, book) {

    if (err) {

      console.log(err);

      return;

    } else {

      res.render('books/details.ejs', {

        title: 'Update Book',

        book: book,

      });

    }

  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
// call on current info
  let book = new Book({

    _id: req.params.id,

    title: req.body.title,

    author: req.body.author,

    genre: req.body.genre,

    read: req.body.read,

  });

  Book.update({_id: req.params.id}, book, function(err) {

    //update info
    if (err) {

      console.log(err);

      return;

    } else {

      res.redirect('/books');

    }

  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  //check book details
  let id = req.params.id;
//and then remove from lib
  Book.remove({_id: id}, function(err) {

    if (err) {

      console.log(err);

      return;

    } else {

      res.redirect('/books');

    }

  });
});


module.exports = router;
