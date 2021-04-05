import React, { useState } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Input, Label, ListGroupItem, Row} from "reactstrap";

var userData = JSON.parse(localStorage.getItem("userInfo"));

function PledgeForm() {
    //const [donorId, setDonorID] = useState('');
    var donorId = userData.id;
    const [resourceId, setResourceId] = useState('');
    const [expiration, setExpiration] = useState('');
    const [quantity, setQuantity] = useState('');

    const submitReview = () => {
        if (userData.role === "Donor") {
            if (donorId && resourceId){
                // Need to update url
                console.log("het yher");
                Axios.post("http://localhost:5000/pledge/",
                {
                    userId: donorId, 
                    resourceId: resourceId,
                    expiration: expiration,
                    quantity: quantity
                }).then(() => {
                    alert('Sucessfully added');
                    window.location.reload();
                });
            }
        }
    };

    return (
        <div className="PledgeForm">
            <div className="pl-lg-4">
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label
                                className="form-control-label"
                                htmlFor="input-resource"
                            ><i className="ni ni-basket pr-2" />Resource</Label>
                            <Row>
                                <Label>Resource: </Label>
                                <Input
                                    className="form-control-alternative"
                                    type="select"
                                    name="resource"
                                    id="input-resource"
                                    onChange={(e) => {
                                        var dropd = document.getElementById("input-resource");
                                        setResourceId(dropd.options[dropd.selectedIndex].id);
                                    }}>
                                <option selected>Please select resource</option>
                                <option id="1">Rice</option>
                                <option id="2">Water</option>
                                <option id="3">Shoes</option>
                                <option id="4">Batteries</option>
                                <option id="5">Chainsaws</option>
                                </Input>
                            </Row>
                            <Row>
                                <Label>Expiration Date: </Label>
                                <Input
                                    type="date"
                                    id="expiration"
                                    onChange={(e) => {
                                        setExpiration(e.target.value);
                                    }}
                                />
                            </Row>
                            <Row>
                                <Label>Quantity: </Label>
                                <Input
                                    id="quantity"
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                    }}
                                />
                            </Row>
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
                            <ListGroupItem
                                className="form-control-alternative"
                                id="input-donor"
                                name="donorName"
                                type="text"
                            >{userData.name}: {userData.location}</ListGroupItem>
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
