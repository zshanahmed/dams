import Pledge from '../components/Posts/Pledge/Pledge';
import Disaster from '../components/Posts/Disaster/Disaster';
import Header from "../components/Headers/Header";
import {Container} from "reactstrap";
import React from "react";

function DonorHome() {
    return(
        <div className="Pledge">
            <Header/>
            <Container className="mt--7" fluid>
                <div className="mt-4">
                    <Pledge />
                </div>
                <div className="mt-4">
                    <Disaster/>
                </div>
            </Container>
        </div>
    )
}

export default DonorHome;