import express from 'express';

import { getDisaster, insertDisaster } from '../controllers/disasters.js';

const disasterRouter = express.Router();

disasterRouter.get('/get', getDisaster);

disasterRouter.post('/insert',  insertDisaster);

export default disasterRouter;