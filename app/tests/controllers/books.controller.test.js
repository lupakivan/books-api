const Joi = require('@hapi/joi');

const BookDTO = require('../../dto/book.dto');

const BooksController = require('../../v_controllers/books.controller');

describe('BooksController', () => {
  describe('BooksController#getById', () => {
    it('should throw error on invalid uuid', async () => {
      const booksController = new BooksController({});

      await expect(booksController.getById(123))
        .rejects
        .toEqual(new Joi.ValidationError('"uuid" must be a string'));
    });

    it('should return null if book is not exists', async () => {
      const booksController = new BooksController({
        getById: () => Promise.resolve(null),
      });

      await expect(booksController.getById('cb9c5eb7-f79f-4f29-835a-d459fc91d8e4'))
        .resolves
        .toEqual(null);
    });

    it('should return book dto on valid request', async () => {
      const modelResponse = { name: 'Hello world' };
      const booksController = new BooksController({
        getById: () => Promise.resolve(modelResponse),
      });

      await expect(booksController.getById('cb9c5eb7-f79f-4f29-835a-d459fc91d8e4'))
        .resolves
        .toEqual(new BookDTO(modelResponse));
    });
  });
  describe('BooksController#create', () => {
    it('should throw error on invalid payload', async () => {
      const booksController = new BooksController({});

      await expect(booksController.create({ not_valid: 123 }))
        .rejects
        .toBeInstanceOf(Joi.ValidationError);
    });

    it('should return created object on valid request', async () => {
      const createData = {
        name: 'name',
        releaseDate: 123,
        authorName: 'authorName',
      };
      const booksController = new BooksController({
        save: () => Promise.resolve(createData),
      });

      await expect(booksController.create(createData))
        .resolves
        .toEqual(new BookDTO(createData));
    });
  });
});
