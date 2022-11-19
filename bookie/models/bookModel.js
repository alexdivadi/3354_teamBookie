const mongoose = require("mongoose")

const bookSchema = {
    title: String,
    author: String,
    pageCount: String,
    readingSchedule: String
}

const Book = mongoose.model("Book", bookSchema)

module.exports = Book