const uuid = require('uuid').v4;

const dynamoDB = require('../db/dynamoDb');

const { CONFIG_BOOKS_TABLE } = process.env;

class Book {
  constructor(db = dynamoDB) {
    this.db = db;
  }

  async getAll() {
    const params = { TableName: CONFIG_BOOKS_TABLE };

    return this.db.scan(params).promise();
  }

  async getById(id) {
    const params = {
      TableName: CONFIG_BOOKS_TABLE,
      Key: {
        uuid: id,
      },
    };

    const { Item } = await this.db.get(params).promise();

    if (Item) {
      return Item;
    }

    return null;
  }

  async save(data) {
    const book = {
      uuid: uuid(),
      name: data.name,
      releaseDate: data.releaseDate,
      authorName: data.authorName,
    };

    const params = {
      TableName: CONFIG_BOOKS_TABLE,
      Item: book,
    };

    await this.db.put(params).promise();

    return book;
  }

  async update(id, data) {
    const book = await this.getById(id);

    if (!book) {
      return null;
    }

    const params = {
      TableName: CONFIG_BOOKS_TABLE,
      Key: {
        uuid: id,
      },
      UpdateExpression: 'set #name = :name, releaseDate = :releaseDate, authorName = :authorName',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': data.name || book.name,
        ':releaseDate': data.releaseDate || book.releaseDate,
        ':authorName': data.authorName || book.authorName,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    const { Attributes } = await this.db.update(params).promise();

    return Attributes;
  }

  async delete(id) {
    const params = {
      TableName: CONFIG_BOOKS_TABLE,
      Key: {
        uuid: id,
      },
      ReturnValues: 'ALL_OLD',
    };

    const { Attributes } = await this.db.delete(params).promise();

    return Boolean(Attributes);
  }
}

module.exports = Book;
