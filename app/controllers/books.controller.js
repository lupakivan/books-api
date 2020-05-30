const Book = require('../models/Book.model');
const schema = require('../validation/schema');
const BookDTO = require('../dto/book.dto');

class BooksController {
  constructor(bookModel = new Book()) {
    this.bookModel = bookModel;
  }

  async getAll() {
    const data = await this.bookModel.getAll();
    return data.Items.map((book) => new BookDTO(book));
  }

  async getById(id) {
    await schema.uuid.required().validateAsync(id);
    const book = await this.bookModel.getById(id);

    if (book) {
      return new BookDTO(book);
    }

    return null;
  }

  async create(data) {
    await schema.bookCreateObject.validateAsync(data);

    const item = await this.bookModel.save(data);
    return new BookDTO(item);
  }

  async update(id, data) {
    await schema.uuid.required().validateAsync(id);
    await schema.bookUpdateObject.validateAsync(data);

    const update = await this.bookModel.update(id, data);

    if (!update) {
      return null;
    }

    return new BookDTO({
      uuid: id,
      ...update,
    });
  }

  async delete(id) {
    await schema.uuid.required().validateAsync(id);
    return this.bookModel.delete(id);
  }
}

module.exports = BooksController;
