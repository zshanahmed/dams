import connection from "../index.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const register = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const location = req.body.location;
  const email = req.body.email;
  const mobile_num = req.body.mobile_num;
  const role = req.body.role;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    const sqlInsert =
      "INSERT into users (name, username, password, location, email, mobile_num, role) VALUES (?,?,?,?,?,?,?)";
    connection.query(
      sqlInsert,
      [name, username, hash, location, email, mobile_num, role],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.status(200).send();
        }
      }
    );
  });
};

// export const login = (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const sqlSelect = "SELECT * from users where username = ?";
//   connection.query(sqlSelect, username, (err, result) => {
//     if (err) {
//       res.send({ err: err });
//     }
//     if (result.length > 0) {
//       bcrypt.compare(password, result[0].password, (err, response) => {
//         if (response) {
//           res.send(result);
//         } else {
//           res.send({ message: "Wrong username/password combination" });
//         }
//       });
//     } else {
//       res.send({ message: "User doesn't exist" });
//     }
//   });
// };
