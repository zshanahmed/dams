import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";

import resourceRouter from "../server/routes/resources.js";
import disasterRouter from "../server/routes/disasters.js";
import { registerRouter } from "../server/routes/auth.js";

// For Session Handling
import cookieParser from "cookie-parser";
import session from "express-session";

import jwt from "jsonwebtoken";
const app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "DAMS",
});

connection.connect();

const verfiyJWT = (req, res, next) => {
  const token = req.headers("x-access-token");

  if (!token) {
    res.send("You are not authenticated! Please log in with your credentials");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate!" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
);
app.use(express.json());
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

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlSelect = "SELECT * from users where username = ?";
  connection.query(sqlSelect, username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          req.session.user = result;
          const id = result[0].id;
          const token = jwt.sign({ id }, "jwtSecret", {
            expiresIn: 300,
          });
          req.session.user = result;
          console.log(req.session.user);
          res.json({ auth: true, token: token, result: result });
        } else {
          res.json({
            auth: false,
            message: "Wrong username/password combination",
          });
        }
      });
    } else {
      res.json({ auth: false, message: "No user exists!" });
    }
  });
};

const app_router = express.Router();
const loginRouter = app_router.post("/signin", login);

app.get("/signin", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.use("/admin/pledge", resourceRouter);
app.use("/admin/disaster", disasterRouter);
app.use("/signup", registerRouter);
app.use("/", loginRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export default connection;