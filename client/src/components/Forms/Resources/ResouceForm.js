import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Col, FormGroup, Input, Label, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Badge} from "reactstrap";
import {useHistory} from "react-router";

var userData = JSON.parse(localStorage.getItem("userData"));

function ResourceForm() {
    const [itemList, setItemList] = useState([]);
    const [itemName, setItem] = useState('');
    const [itemUnit, setUnit] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const history = useHistory();
    const [selectedItem, setSelItem] = useState('');
    const [selectedItemId, setSelItemId] = useState('');
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
                    setMessage(`Added resource: ${itemName}`, "badge-success");
                    document.getElementById("addBtn").setAttribute("hidden", "");
            });
        } else {
            setMessage(`Missing required data`, "badge-warning");
        }
    };

    const updateItem = () => {
        if (itemName && itemUnit) {
            Axios.post("http://localhost:5000/admin/pledge/item/",
            {
                resource: itemName, 
                unit: itemUnit,
                resourceId: selectedItemId,
            }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then(() => {
                    setMessage(`Updated resource: ${itemName}`, "badge-info");
                    document.getElementById("updateBtn").setAttribute("hidden", "");
            });
        } else {
            setMessage(`Missing required data`, "badge-warning");
        }
    }

    const deleteItem = () => {
        var r = window.confirm(`Are you sure you want to delete item: "${selectedItem}", ID#${selectedItemId}?`);
        if (r == true) {
            // Delete item from db
            Axios.post("http://localhost:5000/admin/pledge/delItem",
            {
                resourceId: selectedItemId,
            }, {
                    headers: {
                        "x-access-token" : localStorage.getItem('token')
                    },
                }).then(() => {
                // Set message onscreen
                setMessage(`Deleted resource: ${selectedItem}`, "badge-danger");
            });

            // Remove items from dropdown list
            itemList.map((val, index) => {
                if (val.id == selectedItemId) {
                    itemList.splice(index, 1);
                }
            })
            document.getElementById("deleteButton").setAttribute("hidden", "");
            document.getElementById("item").value = "";
            document.getElementById("units").value = "";
        }
    }

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const selectItem = (e) => {
        if (e.target.id != 0) {
            document.getElementById("deleteButton").removeAttribute("hidden");
            document.getElementById("updateBtn").removeAttribute("hidden");
            document.getElementById("addBtn").setAttribute("hidden", "");
            document.getElementById("item").value = e.target.name;
            document.getElementById("units").value = e.target.value;
            setSelItem(e.target.name);
            setSelItemId(e.target.id);
        } else {
            document.getElementById("deleteButton").setAttribute("hidden", "");
            document.getElementById("addBtn").removeAttribute("hidden");
            document.getElementById("updateBtn").setAttribute("hidden", "");
            document.getElementById("item").value = "";
            document.getElementById("units").value = "";
        }
    }

    const setMessage = (msg, color) => {
        document.getElementById("msgGroup").removeAttribute("hidden");
        var badge = document.getElementById("messageBadge");
        badge.innerHTML = msg;
        badge.setAttribute("class", `badge ${color}`);
        //badge.removeAttribute("hidden");
    }

    const closeMsg = () => {
        document.getElementById("msgGroup").setAttribute("hidden", "");
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
                            ><i className="ni ni-button-play" /> Resource Maintenance Page</Label>
                            <h1 id="msgGroup" hidden>
                                <Button onClick={closeMsg} close />
                                <Badge id="messageBadge" color="secondary">Message Area</Badge>
                            </h1>
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
                                        <DropdownItem id="0" onClick={selectItem}>Create New Resource Item</DropdownItem>
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
                                <Button id="addBtn" color="primary" onClick={addItem}>Add Item</Button>
                                <Button id="updateBtn" color="primary" hidden onClick={updateItem}>Update Item</Button>
                                <Button id="deleteButton" onClick={deleteItem} hidden color="danger">Delete Resource</Button>
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
  }
  
  export default ResourceForm;
