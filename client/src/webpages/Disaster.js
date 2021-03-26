import Disaster from '../components/Posts/Disaster/Disaster';
import Header from "../components/Headers/Header";
import {Container} from "reactstrap";
import React from "react";

function DisasterPage() {
    return(
        <div className="Disaster">
            <Header/>
            <Container className="mt--7" fluid>
                <Disaster />
            </Container>
        </div>
    )
}

export default DisasterPage