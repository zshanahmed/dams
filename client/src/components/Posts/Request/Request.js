import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './Request.css';
import {Card, CardHeader, Container, FormGroup, Row, Table} from "reactstrap";
import {useHistory} from "react-router";

function Request() {
    const [resourceList, setResourceList] = useState([]);
    const ac = new AbortController();
    const history = useHistory();

    var userData = JSON.parse(localStorage.getItem("userData"));

    const fulfilRequest = (val) => {
        // console.log(val);
        history.push(`/donor/pledge?reqID=${val}`);
    } 

    useEffect(() => {
      Axios.get(`http://localhost:5000/admin/pledge/request`, {
          headers: {
              "x-access-token" : localStorage.getItem('token')
          },
      }).then((response) => {
          //console.log(response);
          if (!response.data.auth){
              history.push("/");
          } else {
              setResourceList(response.data.result)
          }
      })
        return () => ac.abort();
    }, [])
  
    return (
      <div className="Request">
          {/* Page content */}
              {/* Table */}
              <Row>
                  <div className="col">
                      <Card className="shadow">
                          <CardHeader className="border-0">
                              <h3 className="mb-0">Open Requests</h3>
                          </CardHeader>
                          <Table className="align-items-center table-flush" responsive>
                              <thead className="thead-light">
                              <tr>
                                  <th scope="col">ID</th>
                                  <th scope="col">Disaster</th>
                                  <th scope="col">Resource</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col"></th>
                              </tr>
                              </thead>
                              <tbody>
                                  {resourceList.map((val) => {
                                    if (val.quantity > 0) {
                                    return (
                                        <tr>
                                            <td>{val.id}</td>
                                            <td>{`(${val.type}) ${val.location}`}</td>
                                            <td>{val.resource}</td>
                                            <td>{val.quantity} {val.unit}</td>
                                            <td>
                                                <FormGroup>
                                                    <button id={val.id} className="btn btn-primary" onClick={(e) => {fulfilRequest(e.target.id)}}>Fulfill</button>
                                                </FormGroup>
                                            </td>
                                        </tr>
                                    )
                                    }
                                  })}
                              </tbody>
                          </Table>
                      </Card>
                  </div>
              </Row>
      </div>
    );
  }
  
  export default Request;