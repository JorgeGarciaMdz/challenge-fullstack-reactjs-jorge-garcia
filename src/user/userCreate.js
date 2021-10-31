import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

export class UserCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            lastname: '',
            email: '',
            password: '',
            dni: 0,
            birthday: new Date().toISOString().slice(0, 10)
        }
        this.handleChange = this.handleChange.bind(this);
        this.formValid = this.formValid.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    formValid(e) {
        e.preventDefault();
        let myHeaders = new Headers({
            "Content-Type": "application/json",
            "Connection": "keep-alive"
        });
        myHeaders.append('Accept', '*/*');
        const myInit = {
            method: this.state.id ? 'PUT' : 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({
                "name": this.state.name,
                "lastname": this.state.lastname,
                "email": this.state.email,
                "password": this.state.password,
                "dni": this.state.dni,
                "birthday": this.state.birthday
            })
        };
        if (this.state.name.length > 3 && this.state.lastname.length > 3 && this.state.email.length > 3
            && this.state.password.length > 4 && this.state.dni > 0) {
            fetch('http://127.0.0.1:3000/api/v1/user', myInit)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    this.setState({ users: data });
                    this.props.changeView('us');

                })
                .catch(e => {
                    console.error('Error: ' + e);
                });
        } else {
            alert('hay campos que no pueden estar vacios');
        }

    }

    render() {
        return <Container>
            <Row style={{ backgroundColor: 'lightcyan', color: 'GrayText' }}>
                <Col md={4}>
                    <h2>New User</h2>
                </Col>
                <Col md={6}></Col>
                <Col md={2}>
                    <Button variant='outline-primary' style={{ marginTop: '3px' }}
                        onClick={() => this.props.changeView('us')}>Back</Button>
                </Col>
            </Row>
            <Row style={{ marginTop: '1em' }}>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name="name"
                                value={this.state.name} onChange={this.handleChange} min={3}
                                />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control type="text" placeholder="Enter lastname" name="lastname"
                                value={this.state.lastname} onChange={this.handleChange} min={3}
                                />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email"
                                value={this.state.email} onChange={this.handleChange} min={5}
                                />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password"
                                value={this.state.password} onChange={this.handleChange} min={4}
                                />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridDni">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control type="number" placeholder="Enter dni" name="dni" min={0}
                                value={this.state.dni} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" name="birthday" value={this.state.birthday}
                                onChange={this.handleChange} />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit" onClick={this.formValid}>
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    }
}