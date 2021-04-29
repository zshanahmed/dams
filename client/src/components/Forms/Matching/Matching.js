import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Label, Row, Table, Button, Badge, Input} from "reactstrap";
import {useHistory} from "react-router";
import {setMessage, closeMsg} from '../../../functions.js';

var userData = JSON.parse(localStorage.getItem("userData"));

function Matching() {
    const [requestList, setRequestList] = useState([]);
    const [pledgeList, setPledgeList] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState('');
    const [selectedPledge, setSelectedPledge] = useState('');
    const [matchedUser, setMatchedUser] = useState('');
    const history = useHistory();
    var donorId = userData.id;

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
                setRequestList(response.data.result)
            }
        })
    }, [])

    const getPledges = (reqID) => {
        console.log(reqID);
        Axios.get(`http://localhost:5000/admin/pledge/pledgeReqID?id=${reqID}`, {
            headers: {
                "x-access-token" : localStorage.getItem('token')
            },
        }).then((response) => {
            //console.log(response);
            if (!response.data.auth){
                history.push("/");
            } else {
                setPledgeList(response.data.result)
            }
        })
    }

    const matchReqPledge = () => {
        if (selectedRequest && selectedPledge) {
            // if ((quantity < requestQuantity) && (quantity > 0)) {
            //     // Submit pledge with requestID and isValid to 0 (for pledge)
            //     // Update current request validity to false (0)
            //     submitFulfillment(0, (requestQuantity - quantity));
            //     document.getElementById("fulfillBtn").setAttribute("hidden", "");
            // } else if (quantity >= requestQuantity) {
            //     // Similar to submitReview() but need to add requestID and set isValid to 0 (for pledge)
            //     // Need to update request quantity to 0 (for request)
            //     submitFulfillment(0, 0);
            //     document.getElementById("fulfillBtn").setAttribute("hidden", "");
            // }
        } else {
            setMessage(`Missing required data`, "badge-warning");
        }
    }

    return (
        <div className="Matching">
            <div className="px-lg-3">
                <Row>
                    <Col>
                        <FormGroup>
                            <Label
                                className="form-control-label"
                                htmlFor="input-resource"
                            ><i className="ni ni-basket pr-2" />Matching - Pledge & Donation
                            </Label>
                            <h1 id="msgGroup" hidden>
                                <Button onClick={closeMsg} close />
                                <Badge id="messageBadge" color="primary">Message Area</Badge>
                            </h1>
                            <Input
                                className="form-control-alternative"
                                type="select"
                                name="request"
                                id="input-request"
                                onChange={(e) => {
                                    var dropd = document.getElementById("input-request");
                                    setSelectedRequest(dropd.options[dropd.selectedIndex].id);
                                    if (dropd.options[dropd.selectedIndex].id == "*") {
                                        document.getElementById("input-resource").setAttribute("hidden", "");
                                        setSelectedRequest('');
                                    } else {
                                        getPledges(dropd.options[dropd.selectedIndex].id);
                                        document.getElementById("input-resource").removeAttribute("hidden");
                                    }
                                }}>
                                <option selected id="*" value="Units">Please select a request to match</option>
                                {requestList.map((val) => {
                                    if (val.quantity > 0) {
                                        return (
                                            <option id={val.resourceID}>{`${val.location} (${val.type}) - ${val.resource} - ${val.quantity} ${val.unit}`}</option>
                                        )
                                    }
                                })}
                            </Input>
                            <br></br>
                            <Input
                                className="form-control-alternative"
                                type="select"
                                name="resource"
                                id="input-resource"
                                hidden
                                onChange={(e) => {
                                    var dropd = document.getElementById("input-resource");
                                    setSelectedPledge(dropd.options[dropd.selectedIndex].id);
                                    setMatchedUser(dropd.options[dropd.selectedIndex].value);
                                    // console.log(dropd.options[dropd.selectedIndex].value);
                                }}>
                                <option selected value="">Please select a pledge to match</option>
                                { pledgeList.map((val) => {
                                        return (
                                            <option id={val.id} value={val.userID}>{val.resource} - {val.quantity} {val.unit} - {val.location} ({val.zip})</option>
                                        )
                                    }
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="dataRow">
                    <Col>
                        <div className="text-center">
                            <FormGroup>
                                <Button id="fulfillBtn" onClick={matchReqPledge} color="default">Match</Button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
  }
  
  export default Matching;
