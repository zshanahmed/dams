import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './Pledge.css';
//import Header from "../../Headers/Header";
import {Card, CardHeader, /*Container,*/ Row, Table} from "reactstrap";

var userData = JSON.parse(localStorage.getItem("userInfo"));

function Pledge() {
    const [resourceList, setResourceList] = useState([]);
  //
    useEffect(() => {
      Axios.get(`http://localhost:5000/admin/pledge/`).then((response) => {
        setResourceList(response.data)
      })
    }, [])
  
    return (
      <div className="Pledge">
          {/* Page content */}
              {/* Table */}
              <Row>
                  <div className="col">
                      <Card className="shadow">
                          <CardHeader className="border-0">
                              <h3 className="mb-0">Resources</h3>
                          </CardHeader>
                          <Table className="align-items-center table-flush" responsive>
                              <thead className="thead-light">
                              <tr>
                                  <th scope="col">Sr#</th>
                                  <th scope="col">Donor Name</th>
                                  <th scope="col">Resource</th>

                              </tr>
                              </thead>
                              <tbody>
                                  {resourceList.map((val) => {
                                      return (
                                          <tr>
                                              <td>{val.id}</td>
                                              <td>{val.donorName}</td>
                                              <td>{val.resource}</td>
                                          </tr>
                                      )
                                  })}
                              </tbody>
                          </Table>
                      </Card>
                  </div>
              </Row>
      </div>
    );
  }
  
  export default Pledge