 import express from 'express';

import { getResource, getAllResources, insertPledge, insertResource } from '../controllers/resources.js';

const resourceRouter = express.Router();

resourceRouter.get('/all', getAllResources);

resourceRouter.get('/', getResource);

//resourceRouter.post('/',  insertResource);
resourceRouter.post('/',  insertPledge);

export default resourceRouter;