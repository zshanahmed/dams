import express from 'express';

import { insertPledge, getUserPledges } from '../controllers/pledge.js';

const pledgeRouter = express.Router();

pledgeRouter.post('/',  insertPledge);

pledgeRouter.get('/get', getUserPledges);

export default pledgeRouter;