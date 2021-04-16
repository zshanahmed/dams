import Header from "../components/Headers/Header";
import {Card, CardHeader, Container, Row} from "reactstrap";
import React from "react";
import EditPledgeForm from "../components/Forms/Pledge/EditPledgeForm";

function EditPledgePage() {
    return(
        <div className="EditPledgePage">
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                            </CardHeader>
                            <EditPledgeForm />
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default EditPledgePage;