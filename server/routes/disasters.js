import express from 'express';

import { getAllDisasters, getDisaster, insertDisaster } from '../controllers/disasters.js';

const disasterRouter = express.Router();

disasterRouter.get('/all', getAllDisasters);

disasterRouter.get('/', getDisaster);

disasterRouter.post('/',  insertDisaster);

export default disasterRouter;