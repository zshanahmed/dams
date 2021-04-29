import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Label, Row, Button, Badge, Input} from "reactstrap";
import {useHistory} from "react-router";
import {setMessage, closeMsg} from '../../../functions.js';

// var userData = JSON.parse(localStorage.getItem("userData"));

function Matching() {
    const [requestList, setRequestList] = useState([]);
    const [pledgeList, setPledgeList] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState('');
    const [selectedReqIndex, setSelectedReqIndex] = useState('');
    const [selectedPledge, setSelectedPledge] = useState('');
    const [selectedPledgeIndex, setSelectedPledgeIndex] = useState('');
    const history = useHistory();
    // var donorId = userData.id;

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
                setRequestList(response.data.result);
            }
        })
    })

    const getPledges = (reqID) => {
        // console.log(reqID);
        Axios.get(`http://localhost:5000/admin/pledge/pledgeReqID?id=${reqID}`, {
            headers: {
                "x-access-token" : localStorage.getItem('token')
            },
        }).then((response) => {
            //console.log(response);
            if (!response.data.auth){
                history.push("/");
            } else {
                setPledgeList(response.data.result);
            }
        })
    }

    const submitFulfillment = (isVal, matchQuantity, reqRemainingQuantity) => {
        // console.log(matchQuantity, reqRemainingQuantity);
        let selPledge = pledgeList[selectedPledgeIndex];
        let selReq = requestList[selectedReqIndex];
        Axios.post("http://localhost:5000/admin/pledge/match",
            {
                pledgeId: selPledge.id,
                quantity: matchQuantity,
                requestId: selReq.id,
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
            requestID: selReq.id,
            quantity: reqRemainingQuantity,
        }, {
                headers: {
                    "x-access-token" : localStorage.getItem('token')
                },
            }).then(() => {
            // Set message onscreen
            setMessage(`Pledge submitted`, "badge-success");
            document.getElementById("fulfillBtn").setAttribute("hidden", "");
        });
        document.getElementById('newBtn').setAttribute("hidden", "");
    }

    const newMatch = () => {
        history.push('/admin/matching');
    }

    const matchReqPledge = () => {
        if (selectedRequest && selectedPledge) {
            console.log(pledgeList[selectedPledgeIndex]);
            console.log(requestList[selectedReqIndex]);
            let selPledge = pledgeList[selectedPledgeIndex];
            let selReq = requestList[selectedReqIndex];
            if ((selPledge.quantity < selReq.quantity) && (selPledge.quantity > 0)) {
                // Submit pledge with requestID and isValid to 0 (for pledge)
                // Update current request validity to false (0)
                submitFulfillment(0, selPledge.quantity, (selReq.quantity - selPledge.quantity));
                document.getElementById("fulfillBtn").setAttribute("hidden", "");
            } else if (selPledge.quantity >= selReq.quantity) {
                // Similar to submitReview() but need to add requestID and set isValid to 0 (for pledge)
                // Need to update request quantity to 0 (for request)
                submitFulfillment(0, selReq.quantity, 0);
                document.getElementById("fulfillBtn").setAttribute("hidden", "");
            }
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
                            <br></br>
                            <Label>Request: </Label>
                            <Input
                                className="form-control-alternative"
                                type="select"
                                name="request"
                                id="input-request"
                                onChange={(e) => {
                                    var dropd = document.getElementById("input-request");
                                    setSelectedRequest(dropd.options[dropd.selectedIndex].id);
                                    setSelectedReqIndex(dropd.options[dropd.selectedIndex].value);
                                    if (dropd.options[dropd.selectedIndex].id === "*") {
                                        document.getElementById("pledge-data").setAttribute("hidden", "");
                                        setSelectedRequest('');
                                    } else {
                                        getPledges(dropd.options[dropd.selectedIndex].id);
                                        document.getElementById("pledge-data").removeAttribute("hidden");
                                    }
                                }}>
                                <option selected id="*" value="">Please select a request to match</option>
                                {requestList.map((val, index) => {
                                    if (val.quantity > 0) {
                                        return (
                                            <option id={val.resourceID} value={index}>{`${val.location} (${val.type}) - ${val.resource} - ${val.quantity} ${val.unit}`}</option>
                                        )
                                    } else {
                                        return (null);
                                    }
                                })}
                            </Input>
                            <br></br>
                            <Col id="pledge-data" className="px-0" hidden>
                            <Label>Pledge: </Label>
                            <Input
                                className="form-control-alternative"
                                type="select"
                                name="pledge"
                                id="input-pledge"
                                onChange={(e) => {
                                    var dropd = document.getElementById("input-pledge");
                                    setSelectedPledge(dropd.options[dropd.selectedIndex].id);
                                    setSelectedPledgeIndex(dropd.options[dropd.selectedIndex].value);
                                }}>
                                <option selected id="pledge-dropdown" value="">Please select a pledge to match</option>
                                { pledgeList.map((val, index) => {
                                        return (
                                            <option id={val.id} value={index}>{val.resource} - {val.quantity} {val.unit} - {val.location} ({val.zip})</option>
                                        )
                                }
                                )}
                            </Input>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="dataRow">
                    <Col>
                        <div className="text-center">
                            <FormGroup>
                                <Button id="fulfillBtn" onClick={matchReqPledge} color="default">Match</Button>
                                <Button id="newBtn" onClick={newMatch} color="default" hidden>New Match</Button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
  }
  
  export default Matching;
