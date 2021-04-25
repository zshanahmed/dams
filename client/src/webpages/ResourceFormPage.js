import Header from "../components/Headers/Header";
import {Card, CardHeader, Container, Row} from "reactstrap";
import React from "react";
import ResourceForm from "../components/Forms/Resources/ResouceForm";

function ResourceFormPage() {
    return(
        <div className="ResourceFormPage">
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                            </CardHeader>
                            <ResourceForm />
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default ResourceFormPage;