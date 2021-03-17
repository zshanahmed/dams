import connection from '../index.js';

export const getAllResources = (req, res) => {
  const sqlSelect = "SELECT * from resources;"
  connection.query(sqlSelect, (err, result) => {
      res.send(result);
  })
}

export const getResource = (req, res) => {
  const resourceId = req.query.id;
  const sqlSelect = "SELECT * from resources WHERE id=?;"
  connection.query(sqlSelect, [resourceId], (err, result) => {
      res.send(result);
  })
}

export const insertResource = (req, res) => {
  const donorName = req.body.donorName;
  const resource = req.body.resource;
  const sqlInsert = "INSERT into resources (donorName, resource) VALUES (?,?)"
  connection.query(sqlInsert, [donorName, resource], (err, result) => {
    if (err) { 
      console.log(err); 
    } else {
      res.status(200).send();
    }
  })
}
