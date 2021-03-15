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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
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
          console.log(req.session.userL);
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password combination" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
};

const loginRouter = express.Router().post("/signin", login);

app.use("/pledge", resourceRouter);
app.use("/disaster", disasterRouter);
app.use("/signup", registerRouter);
app.use("/", loginRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

export default connection;
