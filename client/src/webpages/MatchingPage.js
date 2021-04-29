import Header from "../components/Headers/Header";
import {Card, CardHeader, Container, Row} from "reactstrap";
import React from "react";
import Matching from "../components/Forms/Matching/Matching";

function MatchingPage() {
    return(
        <div className="Matching">
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                            </CardHeader>
                            <Matching />
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default MatchingPage;