import { Router } from 'express'; // From express will only be used the Router class

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

export default routes;
