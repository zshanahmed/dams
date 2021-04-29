import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Input, Row} from "reactstrap";
import {useHistory} from "react-router";

const userData = JSON.parse(localStorage.getItem("userData"));

function RequestForm() {
    const [resourceList, setResourceList] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [message, setMessage] = useState('');
    const history = useHistory();
    const requestorID = userData.id;
    let disasterid = null;
    const [disasterID, setDisasterID] = useState([])
    const [resourceId, setResourceId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] =  useState('')
    const placeholder = 'Please type the input in ' + unit

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        disasterid = urlParams.get('id');
        setDisasterID(disasterid);
        if (disasterid) {
            Axios.get(`http://localhost:5000/admin/pledge/resource/?id=${disasterid}`, {
                headers: {
                    "x-access-token" : localStorage.getItem('token')
                },
            }).then((response) => {
                //console.log(response);
                if (!response.data.auth){
                    history.push("/");
                } else {
                    setCurrentData(response.data.result[0])
                    setResourceList(response.data.result)
                    setUnit(response.data.result[0].unit)
                    setResourceId(JSON.stringify(response.data.result[0].resourceID))
                }
            })
            // Load data into form set flag for updating existing record
        } else {
            history.push("/recipient/index");
        }
    }, [])

    const submitRequest = () => {
        if (resourceId && quantity){
            Axios.post("http://localhost:5000/admin/pledge/request/",
                {
                    requestorID: requestorID,
                    resourceId: resourceId,
                    quantity: quantity,
                    disasterID: disasterID,
                    donorID: null,
                }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then((res) => {
                console.log(res)
                alert('Sucessfully added');
                // window.location.reload();
            });
        } else {
            setMessage("Please select unit and type quantity!")
        }
    };

    Axios.get('http://localhost:5000/signin/').then((response) => {
        //console.log(response);
    })

    const onInputChange = (event) => {
        document.getElementById(event.target.id).value=event.target.value;
    }

    return (
        <div className="RequestForm">
            <div className="pl-lg-4">
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <div className="form-group">
                                <label>Request an Item for disaster # {disasterID}</label><br/>
                                <p>{message}</p>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <label className="form-control-label"
                                   htmlFor="input-resource">
                                <i className="ni ni-box-2 pr-2" />
                                Please select the resource:
                            </label>
                            <Input
                                className="form-control-alternative"
                                type="select"
                                name="resource"
                                id="input-resource"
                                onChange={(e) => {
                                    const drop_down = document.getElementById("input-resource");
                                    setResourceId(drop_down.options[drop_down.selectedIndex].id);
                                    setUnit(drop_down.options[drop_down.selectedIndex].value)
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
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <label className="form-control-label"
                                   htmlFor="input-resource">
                                <i className="ni ni-basket pr-2" />
                                Quantity:
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-location"
                                placeholder= {placeholder}
                                name="location"
                                type="text"
                                value ={quantity}
                                onChange={(e) => {
                                    setQuantity(e.target.value)
                                }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <div className="text-center">
                            <FormGroup>
                                <button className="btn btn-primary" onClick={submitRequest}>Submit Request</button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    );
}

export default RequestForm;
