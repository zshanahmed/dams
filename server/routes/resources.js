import express from 'express';

import { getResource, insertResource } from '../controllers/resources.js';

const resourceRouter = express.Router();

resourceRouter.get('/get', getResource);

resourceRouter.post('/insert',  insertResource);

export default resourceRouter;