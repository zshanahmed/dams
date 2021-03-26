import DisasterForm from '../components/Forms/Disaster/DisasterForm';
import Header from "../components/Headers/Header";
import {Card, CardHeader, Container, Row} from "reactstrap";
import React from "react";

function DisasterFormPage() {
    return(
        <div className="DisasterForm">
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                            </CardHeader>
                            <DisasterForm />
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default DisasterFormPage;