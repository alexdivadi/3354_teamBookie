const express = require("express")
const router = express.Router();
const Book = require("../models/bookModel.js")

router.route("/create").post((post, req) => {
    const title = "req.body.title"
    const author = "req.body.author"
    const pageCount = "req.body.pageCount"
    const readingSchedule = "req.body.readingSchedule"
    const newBook = new Book({
        title,
        author,
        pageCount,
        readingSchedule
    });

    newBook.save()
})



module.exports = router