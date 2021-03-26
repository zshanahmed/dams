import Pledge from '../components/Posts/Pledge/Pledge';
import Header from "../components/Headers/Header";
import {Container} from "reactstrap";
import React from "react";

function PledgePage() {
    return(
        <div className="Pledge">
            <Header/>
            <Container className="mt--7" fluid>
                <Pledge />
            </Container>
        </div>
    )
}

export default PledgePage