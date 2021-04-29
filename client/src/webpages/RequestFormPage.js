import Header from "../components/Headers/Header";
import {Card, CardHeader, Container, Row} from "reactstrap";
import React from "react";
import RequestForm from "../components/Forms/Request/RequestForm";
import Axios from "axios";
import {useHistory} from "react-router";

function RequestFormPage() {
    const history = useHistory();
    Axios.get('http://localhost:5000/signin/').then((response) => {
        if (!response.data.loggedIn) {
            history.push('/auth/login/')
        }
    })

    return(
        <div className="RequestFormPage">
            <Header/>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                            </CardHeader>
                            <RequestForm />
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default RequestFormPage;