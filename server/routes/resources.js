import express from 'express';
import { getResource, getAllResources, insertPledge, getRequests, getPledgeById, updatePledge, insertResource, getResourceByDisaster, createRequest, getAllItems } from '../controllers/resources.js';

const resourceRouter = express.Router();

resourceRouter.get('/all', getAllResources);

resourceRouter.get('/', getResource);

resourceRouter.get('/pledge', getPledgeById);

resourceRouter.get('/resource', getResourceByDisaster)

resourceRouter.get('/request', getRequests);

resourceRouter.post('/item',  insertResource);

resourceRouter.get('/allItems', getAllItems);

resourceRouter.post('/',  insertPledge);
resourceRouter.post('/request', createRequest)

resourceRouter.post('/put', updatePledge);

export default resourceRouter;