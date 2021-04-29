import connection from '../index.js';

export const getAllResources = (req, res) => {
  const sqlSelect = "SELECT * from resources;"
  connection.query(sqlSelect, (err, result) => {
    res.json({result: result, auth: true})
  })
}

export const getResourceByDisaster = (req, res) => {
  const id = req.query.id
  const sqlGet = "SELECT * from resources as rs INNER JOIN disaster_resource as ds ON ds.resourceID = rs.id WHERE rs.id=ds.resourceID and disasterID=(?) and rs.isValid=1;"
  connection.query(sqlGet,[id], (err,result) => {
    res.json({result: result, auth: true, id: id});
  })
}

export const createRequest = (req, res) => {
  const requestorID = req.body.requestorID
  const donorID = req.body.donorID
  const resourceId = req.body.resourceId
  const disasterID = req.body.disasterID
  const quantity = req.body.quantity
  const sqlCreate = "INSERT into requests (requestorID, donorID, disasterID, resourceID, quantity) values (?,?,?,?,?);"
  connection.query(sqlCreate, [requestorID, donorID, disasterID, resourceId, quantity], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send();
    }
  })
}

export const getResource = (req, res) => {
  const userID = req.query.userId;
  const sqlSelect = "SELECT *, pledge.id FROM pledge INNER JOIN resources ON pledge.resourceID=resources.id WHERE userID=(?);";
  connection.query(sqlSelect, [userID], (err, result) => {
    console.log(result);
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