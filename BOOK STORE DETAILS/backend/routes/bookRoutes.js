const express = require("express");
const {
  getBooks,
  updateBook,
  deleteBook,
  addBook,
  getBookWithId,
} = require("../controllers/bookController");
const router = express.Router();

router.get("/getBooks", getBooks);
router.get("/getBookById/:id", getBookWithId);
router.post("/addBook", addBook);
router.put("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);

module.exports = router;
