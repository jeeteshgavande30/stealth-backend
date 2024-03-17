const express = require('express');
const { addBook, assignBook, getBooksOfMembers, getAllBooks,returnBook } = require('../controllers/books.');
const router = express.Router();
router.get('/getAllBooks',getAllBooks);
router.get('/getBooksOfMembers/:MemberId',getBooksOfMembers);
router.post('/addBooks',addBook);
router.post('/assignBook',assignBook);
router.post('/returnBook',returnBook);
module.exports = router;  