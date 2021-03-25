import DisasterForm from '../components/Forms/Disaster/DisasterForm';
import Header from "../components/Headers/Header";
import {Card, CardHeader, Container, Row} from "reactstrap";
import React from "react";
import PledgeForm from "../components/Forms/Pledge/PledgeForm";

function PledgeFormPage() {
    return(
        <div className="PledgeFormPage">
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                            </CardHeader>
                            <PledgeForm />
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default PledgeFormPage;