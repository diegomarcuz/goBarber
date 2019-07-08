import express from 'express';
import routes from './routes';
import './database';
/*
  it is good to use class to back-end, because it can represent how this file
  works
*/
class App {
  constructor() {
    this.server = express();
    this.route();
    this.middleware();
  }

  middleware() {
    /* Use JSON to communication with front-end */
    this.server.use(express.json());
  }

  route() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
