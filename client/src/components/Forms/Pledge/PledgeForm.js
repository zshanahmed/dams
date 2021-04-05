import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Input, Label, ListGroupItem, InputGroupAddon, InputGroupText, Row, InputGroup} from "reactstrap";
import {useHistory} from "react-router";

var userData = JSON.parse(localStorage.getItem("userData"));

function PledgeForm() {
    const [resourceList, setResourceList] = useState([]);
    const history = useHistory();
    var donorId = userData.id;
    const [resourceId, setResourceId] = useState('');
    const [expiration, setExpiration] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
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
                            ><i className="ni ni-basket pr-2" />Pledge an Item</Label>
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
                                <option selected value="Units">Please select resource</option>
                                {resourceList.map((val) => {
                                    return (
                                        <option id={val.id} value={val.unit}>{val.resource}</option>
                                    )
                                  })}
                                </Input>
                            </Row>
                            <Row>
                                <Label>Pledge Expiration Date: </Label>
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
