import express from 'express';

import { getDisaster, insertDisaster } from '../controllers/disasters.js';

const disasterRouter = express.Router();

disasterRouter.get('/', getDisaster);

disasterRouter.post('/',  insertDisaster);

export default disasterRouter;