 import express from 'express';

import { getResource, getAllResources, insertPledge, getRequests, getPledgeById, updatePledge, insertResource, getAllItems, deleteResource } from '../controllers/resources.js';

const resourceRouter = express.Router();

resourceRouter.get('/all', getAllResources);

resourceRouter.get('/', getResource);

resourceRouter.get('/pledge', getPledgeById);

resourceRouter.get('/request', getRequests);

resourceRouter.post('/item',  insertResource);

resourceRouter.get('/allItems', getAllItems);

resourceRouter.post('/',  insertPledge);

resourceRouter.post('/put', updatePledge);

resourceRouter.post('/delItem', deleteResource);

export default resourceRouter;