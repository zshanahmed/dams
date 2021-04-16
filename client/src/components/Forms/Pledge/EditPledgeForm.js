import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Input, Label, ListGroupItem, InputGroupAddon, InputGroupText, Row, InputGroup} from "reactstrap";
import {useHistory} from "react-router";

var userData = JSON.parse(localStorage.getItem("userData"));

function EditPledgeForm() {
    const [resourceList, setResourceList] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const history = useHistory();
    var donorId = userData.id;
    var pledgeId = null;
    const [date, setDate] = useState('');
    const [pledgeID, setPledgeID] = useState('');
    const [resourceId, setResourceId] = useState('');
    const [expiration, setExpiration] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        pledgeId = urlParams.get('id');
        setPledgeID(pledgeId);
        if (pledgeId) {
            Axios.get(`http://localhost:5000/admin/pledge/pledge/?id=${pledgeId}`, {
                headers: {
                    "x-access-token" : localStorage.getItem('token')
                },
            }).then((response) => {
                //console.log(response);
                if (!response.data.auth){
                    history.push("/");
                } else {
                    setDate(response.data.result[0].expiration.split("T")[0]);
                    setCurrentData(response.data.result[0]);
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
  
    const submitReview = () => {
        if (resourceId && expiration && quantity){
            Axios.post("http://localhost:5000/admin/pledge/",
            {
                userId: donorId, 
                resourceId: resourceId,
                expiration: expiration,
                quantity: quantity
            }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then(() => {
                alert('Sucessfully added');
                //window.location.reload();
            });
        }
    };

    const setCalDate = () => {
        document.getElementById("expiration").value = date;
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
                                        document.getElementById("addonUnit").textContent = dropd.options[dropd.selectedIndex].value;
                                    }}>
                                <option selected value={currentData.units}>{currentData.resource}</option>
                                {resourceList.map((val) => {
                                    if(val.resource != currentData.resource) {
                                        return (
                                            <option id={val.id} value={val.unit}>{val.resource}</option>
                                        )
                                    }
                                  })}
                                </Input>
                            </Row>
                            <Row>
                                <Label>Pledge Expiration Date: </Label>
                                <Input
                                    type="date"
                                    id="expiration"
                                    value={date}
                                    onChange={(e) => {
                                        setExpiration(e.target.value);
                                    }}
                                />
                                
                            </Row>
                            <Row>
                                <Label>Quantity: </Label>
                                <InputGroup>
                                <Input
                                    id="quantity"
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                    }}
                                    value={currentData.quantity}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText id="addonUnit">{currentData.unit}</InputGroupText>
                                </InputGroupAddon>
                                </InputGroup>
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
                    <Col md="8">
                        <div className="text-center">
                            <FormGroup>
                                <button className="btn btn-primary" onClick={submitReview}>Update Pledge</button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    );
  }
  
  export default EditPledgeForm;
