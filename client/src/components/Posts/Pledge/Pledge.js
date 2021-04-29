import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './Pledge.css';
import {Card, CardHeader, Container, FormGroup, Row, Table} from "reactstrap";
import {useHistory} from "react-router";

function Pledge() {
    const [resourceList, setResourceList] = useState([]);
    const ac = new AbortController();
    const history = useHistory();

    var userData = JSON.parse(localStorage.getItem("userData"));

    const editPledge = (val) => {
        //console.log(val);
        history.push(`/donor/editPledge?id=${val}`);
    } 

    useEffect(() => {
        var httpAddr;
        if (userData.role == "Admin") {
            httpAddr = `http://localhost:5000/admin/pledge/getAllPledge`;
        } else {
            httpAddr = `http://localhost:5000/admin/pledge/?userId=${userData.id}`;
        }
      Axios.get(httpAddr, {
          headers: {
              "x-access-token" : localStorage.getItem('token')
          },
      }).then((response) => {
          //console.log(response);
          if (!response.data.auth){
              history.push("/");
          } else {
              setResourceList(response.data.result);
          }
      })
        return () => ac.abort();
    }, [])
  
    return (
      <div className="Pledge">
          {/* Page content */}
              {/* Table */}
              <Row>
                  <div className="col">
                      <Card className="shadow">
                          <CardHeader className="border-0">
                                <h3 className="mb-0">Pledges</h3>
                          </CardHeader>
                          <Table className="align-items-center table-flush" responsive>
                              <thead className="thead-light">
                              <tr>
                                  <th scope="col">Resource</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col"></th>
                              </tr>
                              </thead>
                              <tbody>
                                  {resourceList.map((val) => {
                                    if (val.isValid) {
                                        // console.log(val);
                                        return (
                                            <tr>
                                                <td>{val.resource}</td>
                                                <td>{val.quantity} {val.unit}</td>
                                                <td>
                                                    <FormGroup>
                                                        <button id={val.id} className="btn btn-primary" onClick={(e) => {editPledge(e.target.id)}}>Edit</button>
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
  
  export default Pledge