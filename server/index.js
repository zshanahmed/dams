import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';

import resourceRouter from '../server/routes/resources.js';

const app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'DAMS'
});

connection.connect();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', resourceRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export default connection;