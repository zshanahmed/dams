import connection from '../index.js';

// get all pledges for a user
export const getUserPledges = (req, res) => {
  console.log(req.query.userId);
  const userId = req.query.userId;
  const sqlInsert = "SELECT (userID, resourceID, quantity, expiration) FROM pledge WHERE userID=(?);"
  connection.query(sqlInsert, [userId], (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.status(200).send();
      }
  })
}

// get all pledges, in general

// get specific pledge

// update pledge

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
