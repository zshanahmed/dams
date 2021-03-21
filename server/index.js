<<<<<<< HEAD
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
=======
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
>>>>>>> frontend-zeeshan

import resourceRouter from "../server/routes/resources.js";
import disasterRouter from "../server/routes/disasters.js";
import authRouter from "../server/routes/auth.js";

// For Session Handling
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "DAMS",
});

connection.connect();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
<<<<<<< HEAD
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
        if (err) { console.log(err); }
    })
})

const CONNECTION_URL = 'ENTER DB INFO';
const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
=======
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
  })
);

app.use("/pledge", resourceRouter);
app.use("/disaster", disasterRouter);
app.use("/auth", authRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export default connection;
>>>>>>> frontend-zeeshan
