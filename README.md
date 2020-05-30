# Books API

Books API is a simple CRUD node.js server that allows you to manage your book collection. Built on top of the AWS Lambda service.

## Technology stack
* Node.js
* AWS Lambda
* AWS DynamoDB
* Serverless framework


## Installation

Install node.js >= 12.16.x

Install serverless using npm

```bash
npm install serverless -g
```

Install node.js modules locally.

```bash
npm install
```

Install Dynamodb for local development

```bash
serverless dynamodb install
```

## Usage

Run tests:

```bash
npm test
```

Run dev server locally:

```bash
npm run dev
```

Run dev server locally with logs:

```bash
npm run dev:debug
```

Run linter:

```bash
npm run lint
```

Run linter with autofix:

```bash
npm run lint:fix
```

