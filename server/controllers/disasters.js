import connection from '../index.js';

export const getAllDisasters = (req, res) => {
  const sqlSelect = "SELECT * from disasters;"
  connection.query(sqlSelect, (err, result) => {
      res.json({result: result, auth: true});
  })
}

export const getDisaster = (req, res) => {
  const disasterId = req.query.id;
  const sqlSelect = "SELECT * from disasters WHERE disasterId=?;"
  connection.query(sqlSelect, [disasterId], (err, result) => {
      res.json({result: result, auth: true});
  })
}

export const insertDisaster = (req, res) => {
  const date = req.body.date;
  const location = req.body.location;
  const type = req.body.type;
  const sqlInsert = "INSERT into disasters (date, location, type) VALUES (?,?,?)"
  connection.query(sqlInsert, [date, location, type], (err, result) => {
      if (err) { 
        console.log(err); 
      } else {
        res.status(200).send();
      }
  })
}
