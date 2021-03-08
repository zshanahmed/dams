import connection from '../index.js';

export const getResource = (req, res) => {
  const donorName = req.body.donorName;
  const resource = req.body.resource;
  const sqlSelect = "SELECT * from resources;"
  connection.query(sqlSelect, (err, result) => {
      res.send(result);
  })
}

export const insertResource = (req, res) => {
  const donorName = req.body.donorName;
  const resource = req.body.resource;
  const sqlInsert = "INSERT into resources (donorName, resource) VALUES (?,?)"
  connection.query(sqlInsert, [donorName, resource], (err, result) => {
      if (err) { console.log(err); }
  })
}
