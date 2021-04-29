import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Input, Label, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {useHistory} from "react-router";

var userData = JSON.parse(localStorage.getItem("userData"));

function ResourceForm() {
    const [itemList, setItemList] = useState([]);
    const [itemName, setItem] = useState('');
    const [itemUnit, setUnit] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const history = useHistory();
    var donorId = userData.id;
  
    useEffect(() => {
        Axios.get("http://localhost:5000/admin/pledge/allItems", {
                headers: {
                    "x-access-token" : localStorage.getItem('token')
                },
            }).then((response) => {
                if (!response.data.auth){
                    history.push("/");
                } else {
                    setItemList(response.data.result);
                }
            })
    }, [])

    const addItem = () => {
        if (itemName && itemUnit){
            Axios.post("http://localhost:5000/admin/pledge/item/",
            {
                resource: itemName, 
                unit: itemUnit,
            }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then(() => {
                alert(`Sucessfully added item: ${itemName}`);
                //window.location.reload();
            });
        }
    };

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const selectItem = (e) => {
        console.log(e.target.value);
        console.log(e.target);
    }

    Axios.get('http://localhost:5000/signin/').then((response) => {
        //console.log(response);
    })

    return (
        <div className="ResourceForm">
            <div className="pl-lg-4">
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label
                                className="form-control-label"
                                htmlFor="input-resource"
                            ><i className="ni ni-basket pr-2" />Add an Item</Label>
                            <Row>
                                <Label>Item: </Label>
                                <Input
                                    id="item"
                                    placeholder="Water"
                                    onChange={(e) => {
                                        setItem(e.target.value);
                                    }}
                                />
                            </Row>
                            <Row>
                                <Label>Units: </Label>
                                <Input
                                    id="units"
                                    placeholder="Liter"
                                    onChange={(e) => {
                                        setUnit(e.target.value);
                                    }}
                                />
                            </Row>
                            <br></br>
                            <Row>
                                <Dropdown id="dropdown" isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle caret>
                                        Select an Existing Item
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {itemList.map((val) => {
                                            return (
                                                <DropdownItem id={val.id} value={val.unit} name={val.resource} onClick={selectItem}>{val.resource}</DropdownItem>
                                            )
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        <div className="text-center">
                            <FormGroup>
                                <button className="btn btn-primary" onClick={addItem}>Add Item</button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
  }
  
  export default ResourceForm;
