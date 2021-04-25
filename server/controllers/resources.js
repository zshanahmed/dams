import connection from '../index.js';

export const getAllResources = (req, res) => {
  const sqlSelect = "SELECT * from resources;"
  connection.query(sqlSelect, (err, result) => {
    res.json({result: result, auth: true})
  })
}

export const getResource = (req, res) => {
  const userID = req.query.userId;
  const sqlSelect = "SELECT *, pledge.id FROM pledge INNER JOIN resources ON pledge.resourceID=resources.id WHERE userID=(?);";
  connection.query(sqlSelect, [userID], (err, result) => {
    //console.log(result);
    res.json({result: result, auth: true})
  })
}

export const getPledgeById = (req, res) => {
  const pledgeID = req.query.id;
  const sqlSelect = "SELECT * FROM pledge INNER JOIN resources ON pledge.resourceID=resources.id WHERE pledge.id=(?);";
  connection.query(sqlSelect, [pledgeID], (err, result) => {
    res.json({result: result, auth: true})
  })
}

export const insertResource = (req, res) => {
  const unit = req.body.unit;
  const resource = req.body.resource;
  const sqlInsert = "INSERT into resources (unit, resource) VALUES (?,?)"
  connection.query(sqlInsert, [unit, resource], (err, result) => {
    if (err) { 
      console.log(err); 
    } else {
      res.status(200).send();
    }
  })
}

export const updateResource = (req, res) => {
  const unit = req.body.unit;
  const resource = req.body.resource;
  const resourceId = req.body.resourceId;
  const sqlInsert = "UPDATE resources SET unit = ?, resource = ? WHERE (id = '?');";
  connection.query(sqlInsert, [unit, resource, resourceId], (err, result) => {
    if (err) { 
      console.log(err); 
    } else {
     res.status(200).send();
   }
  })
}

export const deleteResource = (req, res) => {
  const resourceId = req.body.resourceId;
  const sqlInsert = "UPDATE resources SET isValid=0 WHERE resources.id = ('?');";
  connection.query(sqlInsert, [resourceId], (err, result) => {
    if (err) { 
      console.log(err); 
    } else {
     res.status(200).send();
   }
  })
}

export const getAllItems = (req, res) => {
  const sqlInsert = "SELECT * FROM resources WHERE isValid=1;"
  connection.query(sqlInsert, (err, result) => {
    if (err) { 
      console.log(err); 
    } else {
      res.json({result: result, auth: true});
    }
  })
}

// Get Requests
export const getRequests = (req, res) => {
  //const sqlInsert = "SELECT id, disasterID, resourceID, quantity FROM requests WHERE donorID IS NULL";
  const sqlInsert = `SELECT requests.id, disasters.location, resources.resource, resources.unit, quantity FROM requests 
  INNER JOIN resources ON requests.resourceID=resources.id 
  INNER JOIN disasters ON requests.disasterID=disasters.id
  WHERE donorID IS NULL;`;
  connection.query(sqlInsert, (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.json({result: result, auth: true});
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

// update pledge
export const updatePledge = (req, res) => {
  const resourceId = req.body.resourceId;
  const quantity = req.body.quantity;
  const id = req.body.id;
  const expiration = req.body.expiration;
  const sqlInsert = "UPDATE pledge SET resourceID = ?, quantity = ?, expiration = ? WHERE (id = '?')";
  connection.query(sqlInsert, [resourceId, quantity, expiration, id], (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.status(200).send();
      }
  })
}