import connection from '../index.js';

export const getAllResources = (req, res) => {
  const sqlSelect = "SELECT * from pledge;"
  connection.query(sqlSelect, (err, result) => {
    res.json({result: result, auth: true})
  })
}

export const getResource = (req, res) => {
  const userID = req.query.userId;
  const sqlSelect = "SELECT * FROM pledge INNER JOIN resources ON pledge.resourceID=resources.id WHERE userID=(?);";
  //"SELECT pledge.id, resources.resource, pledge.quantity, pledge.isValid, resources.unit FROM pledge INNER JOIN resources ON pledge.resourceID=resources.id WHERE userID=(?);";
  connection.query(sqlSelect, [userID], (err, result) => {
    res.json({result: result, auth: true})
    console.log("inside");
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

// Add new pledge to db
export const insertPledge = (req, res) => {
  const resourceId = req.body.resourceId;
  const quantity = req.body.quantity;
  const userId = req.body.userId;
  const expiration = req.body.expiration;
  const sqlInsert = "INSERT into pledge (userID, resourceID, quantity, expiration) VALUES (?,?,?,?)"
  connection.query(sqlInsert, [userId, resourceId, quantity, expiration], (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.status(200).send();
      }
  })
}
