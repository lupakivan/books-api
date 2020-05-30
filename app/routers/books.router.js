const Router = require('koa-router');
const HttpStatus = require('http-status-codes');

const BooksController = require('../controllers/books.controller');

const booksRouter = new Router();
const booksController = new BooksController();

booksRouter.get('/books', async (ctx) => {
  const result = await booksController.getAll();

  ctx.status = HttpStatus.OK;
  ctx.body = { data: result };
});

booksRouter.get('/book/:bookId', async (ctx) => {
  const result = await booksController.getById(ctx.params.bookId);

  if (!result) {
    const status = HttpStatus.NOT_FOUND;
    ctx.status = status;
    ctx.body = HttpStatus.getStatusText(status);
    return;
  }

  ctx.status = HttpStatus.OK;
  ctx.body = { data: result };
});

booksRouter.post('/book/add', async (ctx) => {
  const result = await booksController.create(ctx.request.body);

  ctx.status = HttpStatus.CREATED;
  ctx.body = { data: result };
});

booksRouter.post('/book/:bookId/update', async (ctx) => {
  const { params, request } = ctx;

  const result = await booksController.update(params.bookId, request.body);

  if (!result) {
    const status = HttpStatus.NOT_FOUND;
    ctx.status = status;
    ctx.body = HttpStatus.getStatusText(status);
    return;
  }

  ctx.status = HttpStatus.OK;
  ctx.body = { data: result };
});

booksRouter.post('/book/:bookId/delete', async (ctx) => {
  const result = await booksController.delete(ctx.params.bookId);

  if (!result) {
    const status = HttpStatus.NOT_FOUND;
    ctx.status = status;
    ctx.body = HttpStatus.getStatusText(status);
    return;
  }

  ctx.status = HttpStatus.OK;
  ctx.body = { data: null };
});

module.exports = booksRouter;
