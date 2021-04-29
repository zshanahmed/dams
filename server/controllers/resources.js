import connection from '../index.js';

// Get all resources/items (valid and unvalid)
export const getAllResources = (req, res) => {
  const sqlSelect = "SELECT * from resources;"
  connection.query(sqlSelect, (err, result) => {
    res.json({result: result, auth: true})
  })
}

// Get a resource (on table join)
export const getResource = (req, res) => {
  const userID = req.query.userId;
  const sqlSelect = "SELECT *, pledge.isValid, pledge.id FROM pledge INNER JOIN resources ON pledge.resourceID=resources.id WHERE userID=?;";
  connection.query(sqlSelect, [userID], (err, result) => {
    //console.log(result);
    res.json({result: result, auth: true})
  })
}

// Get all pledges
export const getAllPledge = (req, res) => {
  const sqlSelect = "SELECT * FROM pledge INNER JOIN resources ON pledge.resourceID=resources.id WHERE pledge.isValid=1;"
  connection.query(sqlSelect, (err, result) => {
    res.json({result: result, auth: true})
  })
}

// Get a pledge by ID
export const getPledgeById = (req, res) => {
  const pledgeID = req.query.id;
  const sqlSelect = "SELECT * FROM pledge INNER JOIN resources ON pledge.resourceID=resources.id WHERE pledge.id=?;";
  connection.query(sqlSelect, [pledgeID], (err, result) => {
    res.json({result: result, auth: true})
  })
}

// Get a pledge by resource ID
export const getPledgeByResourceID = (req, res) => {
  const resourceID = req.query.id;
  // console.log(resourceID);
  const sqlSelect = `SELECT pledge.*, resources.*, users.zip, users.location, pledge.id FROM pledge
  INNER JOIN resources ON pledge.resourceID=resources.id 
  INNER JOIN users ON pledge.userID=users.id 
  WHERE pledge.resourceID=?;`;
  connection.query(sqlSelect, [resourceID], (err, result) => {
    res.json({result: result, auth: true})
  })
}

// Instert/add a resource/item
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

// Update a resource/item
export const updateResource = (req, res) => {
  const unit = req.body.unit;
  const resource = req.body.resource;
  const resourceId = req.body.resourceId;
  const sqlInsert = "UPDATE resources SET unit = ?, resource = ? WHERE id = ?;";
  connection.query(sqlInsert, [unit, resource, resourceId], (err, result) => {
    if (err) { 
      console.log(err); 
    } else {
     res.status(200).send();
   }
  })
}

// Delete a resource/item
export const deleteResource = (req, res) => {
  const resourceId = req.body.resourceId;
  const sqlInsert = "UPDATE resources SET isValid=0 WHERE resources.id = ?;";
  connection.query(sqlInsert, [resourceId], (err, result) => {
    if (err) { 
      console.log(err); 
    } else {
     res.status(200).send();
   }
  })
}

// Get all resources/items
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
  const sqlInsert = `SELECT requests.id, disasters.location, disasters.type, resources.resource, resources.unit, requests.resourceID, quantity FROM requests 
  INNER JOIN resources ON requests.resourceID=resources.id 
  INNER JOIN disasters ON requests.disasterID=disasters.id
  WHERE donorID IS NULL;`;
  connection.query(sqlInsert, (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        //console.log(result);
        res.json({result: result, auth: true});
      }
  })
}

// Get Request by ID
export const getRequestById = (req, res) => {
  const requestId = req.query.requestID;
  const sqlInsert = `SELECT requests.id, disasters.location, disasters.type, resources.resource, resources.unit, quantity FROM requests 
  INNER JOIN resources ON requests.resourceID=resources.id 
  INNER JOIN disasters ON requests.disasterID=disasters.id
  WHERE requests.id=?;`;
  connection.query(sqlInsert, [requestId], (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.json({result: result, auth: true});
      }
  })
}

export const updateRequestFulfill = (req, res) => {
  const requestId = req.body.requestID;
  const quantity = req.body.quantity;
  // console.log(requestId, quantity);
  const sqlInsert = "UPDATE requests SET quantity = ? WHERE requests.id = ?;";
  connection.query(sqlInsert, [quantity, requestId], (err, result) => {
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
  const sqlInsert = "INSERT into pledge (userID, resourceID, quantity) VALUES (?,?,?)"
  connection.query(sqlInsert, [userId, resourceId, quantity], (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.status(200).send();
      }
  })
}

// Add a pledge linked to a request
export const insertResponse = (req, res) => {
  const resourceId = req.body.resourceId;
  const quantity = req.body.quantity;
  const userId = req.body.userId;
  const requestId = req.body.requestId;
  const isValid = req.body.isValid;
  const sqlInsert = "INSERT into pledge (userID, resourceID, requestID, quantity, isValid) VALUES (?,?,?,?,?)"
  connection.query(sqlInsert, [userId, resourceId, requestId, quantity, isValid], (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.status(200).send();
      }
  })
}

// Update pledge
export const updatePledge = (req, res) => {
  const resourceId = req.body.resourceId;
  const quantity = req.body.quantity;
  const id = req.body.id;
  const sqlInsert = "UPDATE pledge SET resourceID = ?, quantity = ? WHERE pledge.id = ?";
  connection.query(sqlInsert, [resourceId, quantity, id], (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.status(200).send();
      }
  })
}

// Delete pledge item
export const deletePledge = (req, res) => {
  const pledgeId = req.body.pledgeId;
  const sqlInsert = "UPDATE pledge SET isValid=0 WHERE pledge.id = ?;";
  connection.query(sqlInsert, [pledgeId], (err, result) => {
    if (err) { 
      console.log(err); 
    } else {
     res.status(200).send();
   }
  })
}