import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

export class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

        this.fetchUsers = this.fetchUsers.bind(this);
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        fetch('http://127.0.0.1:3000/api/v1/user')
            .then(res => res.json())
            .then(data => {
                this.setState({ users: data });
            })
            .catch(e => {
                console.error('Error: ' + e);
            });
    }

    render() {
        return <Container>
            <Table striped bordered hover style={{ marginTop: 1 + 'em' }}>
                <thead>
                    <tr key={'t1'}>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        {/* <th>Username</th> */}
                        <th>Dni</th>
                        <th>Birthday</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(u => {
                        return <><tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.lastname}</td>
                            <td>{u.dni}</td>
                            <td>{u.birthday}</td>
                            <td>{u.email}</td>
                            <td>
                                <Button variant="warning" style={{marginRight: '1em'}}>Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </td>
                        </tr></>;
                    })}
                </tbody>
            </Table>
        </Container>;
    }
}

// function UserTab