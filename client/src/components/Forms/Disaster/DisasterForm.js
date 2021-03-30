import React, { useState } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Input, Row} from "reactstrap";

function DisasterForm() {
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    
    const submitDisaster = () => {
        if (date && location && type){
            console.log(date);
            Axios.post("http://localhost:5000/admin/disaster/",
            {
                date: date, 
                location: location,
                type: type
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
  
    return (
        <div className="DisasterForm">
            <div className="pl-lg-4">
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-disaster"
                            ><i className="ni ni-atom pr-2" />
                                Disaster
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-disaster"
                                placeholder="Please type disaster name"
                                name="type"
                                type="text"
                                onChange={(e) => {
                                    setType(e.target.value)
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
                                htmlFor="input-location"
                            ><i className="ni ni-square-pin pr-2" />
                                 Location
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-location"
                                placeholder="Where did it happen?"
                                name="location"
                                type="text"
                                onChange={(e) => {
                                    setLocation(e.target.value)
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
                                htmlFor="input-date"
                            ><i className="ni ni-calendar-grid-58 pr-2" />
                                Date
                            </label>
                            <Input
                                className="form-control datepicker"
                                id="input-date"
                                placeholder="When did it happen?"
                                name="date"
                                type="date"
                                onChange={(e) => {
                                    setDate(e.target.value)
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <div className="text-center">
                            <FormGroup>
                                <button className="btn btn-primary" onClick={submitDisaster}>Submit</button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    );
  }
  
  export default DisasterForm;
