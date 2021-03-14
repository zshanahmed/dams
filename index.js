import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';

import dotenv from 'dotenv'
dotenv.config();

import postRoutes from './routes/posts.js';

const app = express();

var connection = mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbName
}); // Database credentials

connection.connect(); // Connection with database

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    const donorName = req.body.donorName;
    const resource = req.body.resource;
    const sqlSelect = "SELECT * from resources;"
    connection.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post('/api/insert', (req, res) => {
    const donorName = req.body.donorName;
    const resource = req.body.resource;
    const sqlInsert = "INSERT into resources (donorName, resource) VALUES (?,?)"
    connection.query(sqlInsert, [donorName, resource], (err, result) => {
        console.log(err);
    })
})

const CONNECTION_URL = 'ENTER DB INFO';
const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
