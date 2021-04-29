 import express from 'express';

import { getResource, getAllResources, insertPledge, getRequests, getPledgeById, updatePledge, insertResource, getAllItems, deleteResource, deletePledge, getRequestById, insertResponse, updateRequestFulfill, getAllPledge, getPledgeByResourceID } from '../controllers/resources.js';

const resourceRouter = express.Router();

resourceRouter.get('/all', getAllResources);

resourceRouter.get('/', getResource);

resourceRouter.get('/pledge', getPledgeById);

resourceRouter.get('/pledgeReqID', getPledgeByResourceID);

resourceRouter.get('/getAllPledge', getAllPledge);

resourceRouter.post('/delPledge', deletePledge);

resourceRouter.get('/request', getRequests);

resourceRouter.get('/requestID', getRequestById);

resourceRouter.post('/item',  insertResource);

resourceRouter.post('/updateReqFulfill', updateRequestFulfill);

resourceRouter.get('/allItems', getAllItems);

resourceRouter.post('/',  insertPledge);

resourceRouter.post('/response', insertResponse);

resourceRouter.post('/put', updatePledge);

resourceRouter.post('/delItem', deleteResource);

export default resourceRouter;