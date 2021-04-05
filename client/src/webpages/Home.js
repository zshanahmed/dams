import Pledge from '../components/Posts/Pledge/Pledge';
import Disaster from '../components/Posts/Disaster/Disaster';
import Header from "../components/Headers/Header";
import {Container} from "reactstrap";
import React from "react";

function Home() {
    return(
        <div className="Pledge">
            <Header/>
            <Container className="mt--7" fluid>
                <div>
                    <Disaster/>
                </div>
                <div className="mt-4">
                    <Pledge />
                </div>
            </Container>
        </div>
    )
}

export default Home