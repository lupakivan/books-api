const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serverless = require('serverless-http');

const booksRouter = require('./app/routers/books.router');
const errorHandlerMiddleware = require('./app/middlewares/errorHandler');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(errorHandlerMiddleware);
app.use(booksRouter.routes());
app.use(router.allowedMethods());

module.exports.handler = serverless(app);
