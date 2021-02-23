import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes);

app.use(bodyParser.json({message: "hello"}));
app.use(bodyParser.urlencoded({message: "hello"}));
app.use(cors());

const CONNECTION_URL = 'ENTER DB INFO';
const PORT = process.env.port || 5000;

//mongoose.connect(CONNECTION_URL, { useUrlParser: true, useUnifiedTopology: true })
//  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
//  .catch((error) => console.log(error.message));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

//mongoose.set('useFindAndModify', false);
