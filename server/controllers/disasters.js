import connection from '../index.js';

export const getAllDisasters = (req, res) => {
  const sqlSelect = "SELECT * from disasters;"
  connection.query(sqlSelect, (err, result) => {
      res.send(result);
  })
}

export const getDisaster = (req, res) => {
  const disasterId = req.query.id;
  const sqlSelect = "SELECT * from disasters WHERE id=?;"
  connection.query(sqlSelect, [disasterId], (err, result) => {
      res.send(result);
  })
}

export const insertDisaster = (req, res) => {
  const date = req.query.date;
  const location = req.query.location;
  const type = req.query.type;
  const sqlInsert = "INSERT into disasters (date, location, type) VALUES (?,?,?)"
  connection.query(sqlInsert, [date, location, type], (err, result) => {
      if (err) { 
        console.log(err); 
      } else {
        res.status(200).send();
      }
  })
}
