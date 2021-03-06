import express from 'express';
import { getResource, getAllResources, insertPledge, getRequests, getPledgeById, updatePledge, insertResource,getResourceByDisaster, createRequest, updateResource, getAllItems, deleteResource, deletePledge, getRequestById, insertResponse, updateRequestFulfill, getAllPledge, getPledgeByResourceID, matchUpdatePledge } from '../controllers/resources.js';

const resourceRouter = express.Router();

resourceRouter.get('/all', getAllResources);

resourceRouter.get('/', getResource);

resourceRouter.get('/pledge', getPledgeById);

resourceRouter.get('/resource', getResourceByDisaster)

resourceRouter.get('/pledgeReqID', getPledgeByResourceID);

resourceRouter.get('/getAllPledge', getAllPledge);

resourceRouter.post('/delPledge', deletePledge);

resourceRouter.get('/request', getRequests);

resourceRouter.get('/requestID', getRequestById);

resourceRouter.post('/item',  insertResource);

resourceRouter.post('/updateItem', updateResource);

resourceRouter.post('/updateReqFulfill', updateRequestFulfill);

resourceRouter.get('/allItems', getAllItems);

resourceRouter.post('/',  insertPledge);

resourceRouter.post('/request', createRequest)

resourceRouter.post('/response', insertResponse);

resourceRouter.post('/match', matchUpdatePledge);

resourceRouter.post('/put', updatePledge);

resourceRouter.post('/delItem', deleteResource);

export default resourceRouter;