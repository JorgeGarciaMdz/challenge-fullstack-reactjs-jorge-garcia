import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { UserTable } from './userTable';

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return <Container>
            <Container fluid style={{ backgroundColor: 'whitesmoke' }}>
                <Row>
                    <Col md={2}>
                        <Button variant="outline-primary" style={{ marginTop: '6px' }}
                            onClick={() => this.props.changeView('op')}>Back</Button>
                    </Col>
                    <Col>
                        <h1 style={{ color: 'GrayText' }}>Users</h1>
                    </Col>
                    <Col md={3}>
                        <Button variant="outline-primary" style={{ marginTop: '6px' }}
                            onClick={() => this.props.changeView('cu')}>New User</Button>
                    </Col>

                </Row>
            </Container>
            <Container>
                <hr />
                <UserTable />
            </Container>
        </Container>
    }
}