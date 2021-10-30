import React from 'react';
import { Form, Row, Button, Col } from 'react-bootstrap';
import { ModalGeneric } from '../Modal/modal';


export class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.operationId ? this.props.operationId : null,
      concept: '',
      amount: 1,
      typeOperation: 'INGRESO',
      user_id: null,
      users: [],
      user_name: '',
      date: this.props.date,
      showModal: false
    }

    this.fetchDetailsOperation = this.fetchDetailsOperation.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFormIsValid = this.handleFormIsValid.bind(this);
    this.callBackDeleteOperation = this.callBackDeleteOperation.bind(this);
  }

  componentDidMount() {
    if (this.props.operationId) {
      this.fetchDetailsOperation(this.props.operationId);
      this.fetchUsers();
    } else
      this.fetchUsers();
  }

  callBackDeleteOperation(confirm) {
    this.setState({ showModal: false });
    this.props.changeView('op');
  }

  handleInput(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name
    this.setState({
      [name]: value
    });
  }

  handleFormIsValid(e) {
    e.preventDefault();
    if (this.state.concept.length > 2 && this.state.date.length > 3) {

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
          "id": this.state.id,
          "concept": this.state.concept,
          "amount": this.state.amount,
          "typeOperation": this.state.typeOperation,
          "user_id": this.state.user_id,
          "date": this.state.date
        })
      };
      fetch(`http://127.0.0.1:3000/api/v1/operation`, myInit)
        .then(res => {
          if (res.status === 200)
            this.setState({ showModal: true });
          return res.json();
        })
        .then(data => {
        }).catch(e => {
          console.error('Error: ' + e);
        })
    }
  }

  fetchUsers() {
    fetch('http://127.0.0.1:3000/api/v1/user')
      .then(res => res.json())
      .then(data => {
        console.log('---_> ' + JSON.stringify(this.state));
        this.setState({ users: data });
        if (this.state.user_id) {
          data.forEach(u => {
            if (this.state.user_id === u.id) {
              this.setState({ user_name: u.name + ' ' + u.lastname });
            }
          });
        } else {
          this.setState({ user_id: data[0].id });
        }
      })
      .catch(e => {
        console.error('Error: ' + e);
      });
  }

  fetchDetailsOperation(id) {
    fetch(`http://127.0.0.1:3000/api/v1/operation/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          concept: data[0].concept,
          amount: data[0].amount,
          typeOperation: data[0].typeOperation,
          user_id: data[0].user_id,
          date: data[0].date
        });
      })
      .catch(e => {
        console.error('Error: ' + e);
      });
  }

  render() {
    return <div>
      <Form onSubmit={this.handleFormIsValid}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridConcept">
            <Form.Label>Concept</Form.Label>
            <Form.Control type="text" placeholder="Vianda" minLength="3" name="concept"
              onChange={(e) => this.handleInput(e)} required
              value={this.state.concept ? this.state.concept : ''} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="1.0" min="1.0" required name="amount"
              onChange={this.handleInput} value={this.state.amount ? this.state.amount : 1.0}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={this.state.date ? this.state.date.toString() : this.state.date.toString()}
              name="date" onChange={this.handleInput} />
            {/* value = "2017-06-01" */}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridOperationType">
            <Form.Label>Operation Type</Form.Label>
            <Form.Select name="typeOperation" onChange={this.handleInput}
              defaultValue={this.state.typeOperation}
              disabled={this.state.id ? true : false} >
              <option>INGRESO</option>
              <option>EGRESO</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridUsers">
            <Form.Label>Users</Form.Label>
            <Form.Select name="user_id" onChange={this.handleInput}>
              {this.state.users.map(u => {
                if (this.state.user_name && this.state.user_id && this.state.user_id === u.id) {
                  return <option key={u.id} id={u.id} value={u.id} selected="selected">
                    {u.name}  {u.lastname} </option>
                } else {
                  return <option key={u.id} id={u.id} value={u.id} >
                    {u.name}  {u.lastname} </option>
                }
              })}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
          <Col>
            <Button variant="outline-primary" onClick={() => this.props.changeView('op')}>
              Back
            </Button>
          </Col>
          <Col>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <ModalGeneric show={this.state.showModal} callback={this.callBackDeleteOperation}
        head={"New Operation"} body={"New Operation success!!!"} />
    </div>
  }
}
