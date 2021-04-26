import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Input, Label, ListGroupItem, InputGroupAddon, InputGroupText, Row, InputGroup, Button, Badge} from "reactstrap";
import {useHistory} from "react-router";
import {setMessage, closeMsg} from '../../../functions.js';

var userData = JSON.parse(localStorage.getItem("userData"));

function EditPledgeForm() {
    const [resourceList, setResourceList] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const history = useHistory();
    var donorId = userData.id;
    const [pledgeID, setPledgeID] = useState('');
    const [resourceId, setResourceId] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let pledgeID = urlParams.get('id');
        setPledgeID(pledgeID);
        if (pledgeID) {
            Axios.get(`http://localhost:5000/admin/pledge/pledge/?id=${pledgeID}`, {
                headers: {
                    "x-access-token" : localStorage.getItem('token')
                },
            }).then((response) => {
                //console.log(response);
                if (!response.data.auth){
                    history.push("/");
                } else if (response.data.result[0]) {
                    setCurrentData(response.data.result[0]);
                    setResourceId(response.data.result[0].resourceID);
                    setQuantity(response.data.result[0].quantity);
                } else {
                    history.push('/donor/index');
                }
            })
            // Load data into form set flag for updating existing record
        } else {
            history.push("/donor/index");
        }
        Axios.get("http://localhost:5000/admin/pledge/all", {
            headers: {
                "x-access-token" : localStorage.getItem('token')
            },
        }).then((response) => {
            //console.log(response);
            if (!response.data.auth){
                history.push("/");
            } else {
                setResourceList(response.data.result)
            }
        })
          //return () => ac.abort();
      }, [])
  
    const updatePledge = () => {
        if (resourceId && quantity){
            Axios.post("http://localhost:5000/admin/pledge/put",
            {
                id: pledgeID, 
                resourceId: resourceId,
                quantity: quantity
            }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then(() => {
                // Set message onscreen
                setMessage(`Updated pledge`, "badge-success");
            });
        }
    };

    const deletePledge = () => {
        var r = window.confirm(`Are you sure you want to delete this pledge?`);
        if (r == true) {
            // Delete item from db
            Axios.post("http://localhost:5000/admin/pledge/delPledge",
            {
                pledgeId: pledgeID,
            }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then(() => {
                // Set message onscreen
                setMessage(`Deleted resource: ${currentData.resource}`, "badge-danger");
            });
            
            // Hide all data fields on the page upon delete
            document.getElementById("deleteButton").setAttribute("hidden", "");
            let rows = document.getElementsByClassName("dataRow");
            for (var i=0; i<rows.length; i++) {
                rows[i].setAttribute("hidden", "");
            }

        }
    }

    const onInputChange = (event) => {
        document.getElementById(event.target.id).value=event.target.value;
      }

    Axios.get('http://localhost:5000/signin/').then((response) => {
        //console.log(response);
    })

    return (
        <div className="PledgeForm">
            <div className="pl-lg-4">
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label
                                className="form-control-label"
                                htmlFor="input-resource"
                            ><i className="ni ni-basket pr-2" />Edit Pledge ID#{pledgeID}</Label>
                            <h1 id="msgGroup" hidden>
                                <Button onClick={closeMsg} close />
                                <Badge id="messageBadge" color="primary">Message Area</Badge>
                            </h1>
                            <Row className="dataRow">
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
                                <option selected id={currentData.resourceID} value={currentData.unit}>{currentData.resource}</option>
                                {resourceList.map((val) => {
                                    if(val.resource != currentData.resource) {
                                        return (
                                            <option id={val.id} value={val.unit}>{val.resource}</option>
                                        )
                                    }
                                  })}
                                </Input>
                            </Row>
                            <Row className="dataRow">
                                <Label>Quantity: </Label>
                                <InputGroup>
                                <Input
                                    id="quantity"
                                    defaultValue={currentData.quantity}
                                    onChange={(e) => {
                                        onInputChange(e);
                                        setQuantity(e.target.value);
                                    }}/>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText id="addonUnit">{currentData.unit}</InputGroupText>
                                </InputGroupAddon>
                                </InputGroup>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="dataRow">
                    <Col md="8">
                        <FormGroup>
                            <Label
                                className="form-control-label"
                                htmlFor="input-donor"
                            ><i className="ni ni-circle-08 pr-2" />
                                Donor Information
                            </Label>
                            <ListGroupItem
                                className="form-control-alternative"
                                id="input-donor"
                                name="donorName"
                                type="text"
                            >{userData.name}: {userData.location}</ListGroupItem>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="dataRow">
                    <Col md="8">
                        <div className="text-center">
                            <FormGroup>
                                <Button id="updateButton" color="primary" onClick={updatePledge}>Update Pledge</Button>
                                <Button id="deleteButton" onClick={deletePledge} color="danger">Delete Pledge</Button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    );
  }
  
  export default EditPledgeForm;
