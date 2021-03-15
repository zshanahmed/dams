import connection from "../index.js";

export const register = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlInsert = "INSERT into users (username, password) VALUES (?,?)";
  connection.query(sqlInsert, [username, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send();
    }
  });
};

export const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlSelect = "SELECT * from users where username = ? and password = ?";
  connection.query(sqlSelect, [username, password], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      console.log(result);
      res.send(result);
    } else {
      res.send({ message: "Wrong username/password combination" });
    }
  });
};
