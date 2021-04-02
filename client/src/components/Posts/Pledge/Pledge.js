import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './Pledge.css';
import {Card, CardHeader, Container, Row, Table} from "reactstrap";
import {useHistory} from "react-router";

function Pledge() {
    const [resourceList, setResourceList] = useState([]);
    const ac = new AbortController();
    const history = useHistory();
  
    useEffect(() => {
      Axios.get("http://localhost:5000/admin/pledge/all", {
          headers: {
              "x-access-token" : localStorage.getItem('token')
          },
      }).then((response) => {
          console.log(response);
          if (!response.data.auth){
              history.push("/");
          } else {
              setResourceList(response.data.result)
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