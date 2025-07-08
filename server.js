const jsonServer = require('json-server');
const path = require('path');
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'public'),
  noCors: false
});

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// API routes - these should be handled by json-server router
server.use('/api', router);

// Also handle API routes without /api prefix for backward compatibility
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}/contacts`);
  console.log(`Website available at http://localhost:${port}/`);
});
