 import express from 'express';

import { getResource, getAllResources, insertPledge, getRequests, getPledgeById, updatePledge, insertResource } from '../controllers/resources.js';

const resourceRouter = express.Router();

resourceRouter.get('/all', getAllResources);

resourceRouter.get('/', getResource);

resourceRouter.get('/pledge', getPledgeById);

resourceRouter.get('/request', getRequests);

//resourceRouter.post('/',  insertResource);
resourceRouter.post('/',  insertPledge);

resourceRouter.post('/put', updatePledge);

export default resourceRouter;