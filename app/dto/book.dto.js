class BookDTO {
  constructor(book) {
    this.uuid = book.uuid;
    this.name = book.name;
    this.releaseDate = book.releaseDate;
    this.authorName = book.authorName;
  }
}

module.exports = BookDTO;
