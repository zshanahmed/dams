import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './Disaster.css';
import {Card, CardHeader, Container, Row, Table} from "reactstrap";
import {useHistory} from "react-router";

function Disasters() {
  const [disasterList, setDisasterList] = useState([]);
  const ac = new AbortController();
  const history = useHistory()

  useEffect(() => {
    Axios.get("http://localhost:5000/admin/disaster/all",
        {
          headers: {
          "x-access-token" : localStorage.getItem('token')
          },
        }).then((response) => {
        //console.log(response.data.auth);
        if (!response.data.auth){
            history.push("/");
        } else {
          setDisasterList(response.data.result)
        }
    })
      return () => ac.abort();
  }, [])

  return (
    <div className="Disasters">
        {/* Page content */}
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Disaster</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                    <th scope="col">Sr#</th>
                    <th scope="col">Disaster</th>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>

                  </tr>
                  </thead>
                  <tbody>
                  {disasterList.map((val) => {
                    return (
                        <tr>
                          <td>{val.id}</td>
                          <td>{val.type}</td>
                          <td>{val.date.slice(0,10)}</td>
                          <td>{val.location}</td>
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

export default Disasters;