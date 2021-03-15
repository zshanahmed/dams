import connection from "../index.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const register = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const fName = req.body.fName;
  const lastName = req.body.lastName;
  const location = req.body.location;
  const email = req.body.email;
  const sec_ans = req.body.sec_ans;
  const mobile_num = req.body.mobile_num;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    const sqlInsert =
      "INSERT into users (fName, lastName, username, password, location, email, security_ans, mobile_num) VALUES (?,?,?,?,?,?,?,?)";
    connection.query(
      sqlInsert,
      [fName, lastName, username, hash, location, email, sec_ans, mobile_num],
      (err, result) => {
        if (err) {
          console.log(err);
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
