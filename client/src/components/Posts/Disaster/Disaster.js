import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import './Disaster.css';
import {Card, CardHeader, Container, FormGroup, Row, Table} from "reactstrap";
import {useHistory} from "react-router";

const userData = JSON.parse(localStorage.getItem("userData"));


function Disasters() {
  const [disasterList, setDisasterList] = useState([]);
  const ac = new AbortController();
  const history = useHistory()

    const makeRequest = (id) => {
        history.push(`/recipient/request?id=${id}`)
    }

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
                  <h3 className="mb-0">Disasters</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                    <th scope="col">Sr#</th>
                    <th scope="col">Disaster</th>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>
                      {userData.role == "Recipient" ? (
                    <th scope="col"></th>) : (<br/>) }
                  </tr>
                  </thead>
                  <tbody>
                  {disasterList.map((val) => {
                    return (
                        <tr key={val.id}>
                          <td>{val.id}</td>
                          <td>{val.type}</td>
                          <td>{val.date.slice(0,10)}</td>
                          <td>{val.location}</td>
                            {userData.role == "Recipient" ? (
                        <FormGroup>
                            <button id={val.id} className="btn btn-primary mt-3" onClick={(e) => {makeRequest(e.target.id)}}>Make Request</button>
                        </FormGroup>)  : (<br/>) }
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