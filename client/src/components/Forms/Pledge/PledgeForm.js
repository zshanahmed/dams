import React, { useState } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Input, Row} from "reactstrap";

function PledgeForm() {
    const [donorName, setDonorName] = useState('');
    const [resource, setResource] = useState('');
  
    const submitReview = () => {
        if (donorName && resource){
            Axios.post("http://localhost:5000/admin/pledge/",
            {
                donorName: donorName, 
                resource: resource
            }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then(() => {
                alert('Sucessfully added');
                window.location.reload();
            });
        }
    };

    Axios.get('http://localhost:5000/signin/').then((response) => {
        console.log(response);
    })

    return (
        <div className="PledgeForm">
            <div className="pl-lg-4">
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-resource"
                            ><i className="ni ni-basket pr-2" />
                                Resource
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-resource"
                                placeholder="Please type resource name"
                                name="resource"
                                type="text"
                                onChange={(e) => {
                                    setResource(e.target.value)
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-donor"
                            ><i className="ni ni-circle-08 pr-2" />
                                Donor
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-donor"
                                placeholder="Who donated this resource?"
                                name="donorName"
                                type="text"
                                onChange={(e) => {
                                    setDonorName(e.target.value)
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <div className="text-center">
                            <FormGroup>
                                <button className="btn btn-primary" onClick={submitReview}>Submit</button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    );
  }
  
  export default PledgeForm;
