import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mysql from 'mysql';
import cors from 'cors';

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

import postRoutes from './routes/posts.js';

const app = express();
// const mysql = require('mysql');

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

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = "INSERT into movie_reviews (movieName, movieReview) VALUES (?,?)"
    connection.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    })
})

const CONNECTION_URL = 'ENTER DB INFO';
const PORT = process.env.port || 5000;

//mongoose.connect(CONNECTION_URL, { useUrlParser: true, useUnifiedTopology: true })
//  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
//  .catch((error) => console.log(error.message));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

//mongoose.set('useFindAndModify', false);
