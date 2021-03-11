import express from 'express';

import { getResource, insertResource } from '../controllers/resources.js';

const resourceRouter = express.Router();

resourceRouter.get('/', getResource);

resourceRouter.post('/',  insertResource);

export default resourceRouter;