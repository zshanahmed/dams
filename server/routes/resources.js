 import express from 'express';

import { getResource, getAllResources, insertResource } from '../controllers/resources.js';

const resourceRouter = express.Router();

resourceRouter.get('/all', getAllResources);

resourceRouter.get('/', getResource);

resourceRouter.post('/',  insertResource);

export default resourceRouter;