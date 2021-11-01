import React from 'react';
import { Container, Table, Button, Row } from 'react-bootstrap';
import { ModalGeneric } from '../Modal/modal';

export class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showModal: false,
            userId: null,
        }

        this.fetchUsers = this.fetchUsers.bind(this);
        this.callBackDeleteUser = this.callBackDeleteUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        this.fetchUsers();
    }

    callBackDeleteUser(confirm){
        this.setState({showModal: false});
        if( confirm){
            fetch(`http://127.0.0.1:3000/api/v1/user/${this.state.userId}`, { method: 'DELETE'})
            .then(res => res.status)
            .then(data => {
                this.fetchUsers();
            })
            .catch(e => {
                console.error('Error: ' + e);
            });
        }
    }

    deleteUser( userId ){
        this.setState({userId: userId});
        this.setState({showModal: true});
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
            <Row>
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
                                <Button variant="warning" style={{marginRight: '1em'}}
                                onClick={() => {this.props.setUser(u.id); this.props.changeView('cu')}}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => this.deleteUser(u.id)}>Delete</Button>
                            </td>
                        </tr></>;
                    })}
                </tbody>
            </Table>
            </Row>
            <Row>
                <ModalGeneric show={this.state.showModal} callback={this.callBackDeleteUser}
                    head={"User"} body={"Confirm delete user!"} />
            </Row>
        </Container>;
    }
}
