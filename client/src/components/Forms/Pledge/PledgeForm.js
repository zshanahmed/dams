import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Input, Label, ListGroupItem, InputGroupAddon, InputGroupText, Row, InputGroup, Button, Badge} from "reactstrap";
import {useHistory} from "react-router";
import {setMessage, closeMsg} from '../../../functions.js';

var userData = JSON.parse(localStorage.getItem("userData"));

function PledgeForm() {
    const [resourceList, setResourceList] = useState([]);
    const history = useHistory();
    var donorId = userData.id;
    const [resourceId, setResourceId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [requestQuantity, setRequestQuantity] = useState('');
    const [requestId, setRequestId] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let reqId = urlParams.get('reqID');
        if (reqId) {
            document.getElementById("pledgeResourceRow").setAttribute("hidden", "");
            document.getElementById("requestResourceRow").removeAttribute("hidden");
            document.getElementById("addBtn").setAttribute("hidden", "");
            document.getElementById("fulfillBtn").removeAttribute("hidden");
            Axios.get(`http://localhost:5000/admin/pledge/requestID?requestID=${reqId}`, {
                headers: {
                    "x-access-token" : localStorage.getItem('token')
                },
            }).then((response) => {
                //console.log(response);
                if (!response.data.auth){
                    history.push("/");
                } else {
                    setResourceList(response.data.result);
                    setRequestId(reqId);
                    setResourceId(response.data.result[0].id);
                    //console.log(response.data.result[0].quantity);
                    document.getElementById('quantity').value = response.data.result[0].quantity;
                    document.getElementById("addonUnit").textContent = response.data.result[0].unit;
                    setRequestQuantity(response.data.result[0].quantity);
                    setQuantity(response.data.result[0].quantity);
                }
            })
        } else {
            Axios.get("http://localhost:5000/admin/pledge/all", {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then((response) => {
                    if (!response.data.auth){
                        history.push("/");
                    } else {
                        setResourceList(response.data.result)
                    }
            })
        }
          //return () => ac.abort();
    }, [])
  
    const submitReview = () => {
        if (resourceId && quantity){
            Axios.post("http://localhost:5000/admin/pledge/",
            {
                userId: donorId, 
                resourceId: resourceId,
                quantity: quantity
            }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then(() => {
                // Set message onscreen
                setMessage(`Pledge submitted`, "badge-success");
                document.getElementById("addBtn").setAttribute("hidden", "");
            });
        } else {
            // Set message onscreen
            setMessage(`Missing required data`, "badge-warning");
        }
    };


    const submitFulfillment = (isVal, reqQuantity) => {
        Axios.post("http://localhost:5000/admin/pledge/response",
            {
                userId: donorId, 
                resourceId: resourceId,
                quantity: quantity,
                requestId: requestId,
                isValid: isVal,
            }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then(() => {
                // Set message onscreen
                setMessage(`Pledge submitted`, "badge-success");
                document.getElementById("fulfillBtn").setAttribute("hidden", "");
            });
        Axios.post("http://localhost:5000/admin/pledge/updateReqFulfill",
            {
                requestID: requestId,
                quantity: reqQuantity,
            }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then(() => {
                // Set message onscreen
                setMessage(`Pledge submitted`, "badge-success");
                document.getElementById("fulfillBtn").setAttribute("hidden", "");
            });
    }

    const fulfillRequest = () => {
        if (resourceId && quantity){
            if ((quantity < requestQuantity) && (quantity > 0)) {
                // Submit pledge with requestID and isValid to 0 (for pledge)
                // Update current request validity to false (0)
                submitFulfillment(0, (requestQuantity - quantity));
                document.getElementById("fulfillBtn").setAttribute("hidden", "");
            } else if (quantity >= requestQuantity) {
                // Similar to submitReview() but need to add requestID and set isValid to 0 (for pledge)
                // Need to update request quantity to 0 (for request)
                submitFulfillment(0, 0);
                document.getElementById("fulfillBtn").setAttribute("hidden", "");
            }
        } else {
            setMessage(`Missing required information`, "badge-warning");
        }
    }

    Axios.get('http://localhost:5000/signin/').then((response) => {
        //console.log(response);
    })

    return (
        <div className="PledgeForm">
            <div className="px-lg-3">
                <Row>
                    <Col class="md-8">
                        <FormGroup>
                            <Label
                                className="form-control-label"
                                htmlFor="input-resource"
                            ><i className="ni ni-basket pr-2" />Pledge a Resource Donation</Label>
                            <h1 id="msgGroup" hidden>
                                <Button onClick={closeMsg} close />
                                <Badge id="messageBadge" color="primary">Message Area</Badge>
                            </h1>
                            <div class="px-3">
                            <Row id="pledgeResourceRow">
                                <Label>Resource: </Label>
                                <Input
                                    className="form-control-alternative"
                                    type="select"
                                    name="resource"
                                    id="input-resource"
                                    onChange={(e) => {
                                        var dropd = document.getElementById("input-resource");
                                        setResourceId(dropd.options[dropd.selectedIndex].id);
                                        document.getElementById("addonUnit").textContent = dropd.options[dropd.selectedIndex].value;
                                    }}>
                                <option selected value="Units">Please select resource</option>
                                {resourceList.map((val) => {
                                    return (
                                        <option id={val.id} value={val.unit}>{val.resource}</option>
                                    )
                                  })}
                                </Input>
                            </Row>
                            <Row id="requestResourceRow" hidden>
                            <Label>Resource: </Label>
                                <Input
                                    disabled
                                    className="form-control-alternative"
                                    type="select"
                                    name="resource"
                                    id="input-resource"
                                    onChange={(e) => {
                                        var dropd = document.getElementById("input-resource");
                                        setResourceId(dropd.options[dropd.selectedIndex].id);
                                        document.getElementById("addonUnit").textContent = dropd.options[dropd.selectedIndex].value;
                                    }}>
                                {resourceList.map((val) => {
                                    return (
                                        <option selected id={val.id} value={val.unit}>{val.resource}</option>
                                    )
                                  })}
                                </Input>
                            </Row>
                            <Row>
                                <Label>Quantity: </Label>
                                <InputGroup>
                                <Input
                                    id="quantity"
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                    }}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText id="addonUnit">Units</InputGroupText>
                                </InputGroupAddon>
                                </InputGroup>
                            </Row>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-donor"
                            ><i className="ni ni-circle-08 pr-2" />
                                Donor Information
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
                    <Col>
                        <div className="text-center">
                            <FormGroup>
                                <Button id="addBtn" color="primary" onClick={submitReview}>Submit</Button>
                                <Button id="fulfillBtn" color="primary" hidden onClick={fulfillRequest}>Fulfill</Button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    );
  }
  
  export default PledgeForm;
