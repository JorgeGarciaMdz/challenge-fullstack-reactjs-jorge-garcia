import React from 'react';
import { Form, Row, Button, Col } from 'react-bootstrap';

export class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      concept: props.concept ? props.concept : '',
      amount: props.amount ? props.amount : 1,
      typeOperation: props.typeOperation ? props.typeOperation : 'INGRESO',
      user_id: props.user ? props.user : null,
      users: [],
      user_name: '',
      formIsValid: false,
      date: props.date ? props.date : '',
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFormIsValid = this.handleFormIsValid.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  handleInput(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name
    this.setState({
      [name]: value
    });
    // console.log('state: ' +this.state.concept)
  }

  handleFormIsValid(e) {
    e.preventDefault();
    if (this.state.concept.length > 2 && this.state.date.length > 3) {
      console.log('VAlid ');
      console.log(JSON.stringify(this.state));

      let myHeaders = new Headers({
        "Content-Type": "application/json",
        "Connection": "keep-alive"
      });
      myHeaders.append('Accept', '*/*');
      const myInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({
          "concept": this.state.concept,
          "amount": this.state.amount,
          "typeOperation": this.state.typeOperation,
          "user_id": this.state.user_id
        })
      };
      fetch(`http://127.0.0.1:3000/api/v1/operation`, myInit)
        .then(res => res.json())
        .then(data => {
          // this.setState({ operation: data });
          console.log(JSON.stringify(data));
        }).catch(e => {
          console.error('Error: ' + e);
        })
    }
  }

  fetchUsers() {
    fetch('http://127.0.0.1:3000/api/v1/user')
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
        if (this.state.user_id) {
          data.forEach(u => {
            if (this.state.user_id === u.id)
              this.setState({ user_name: u.name + ' ' + u.lastname });
          });
        } else {
          this.setState({ user_id: data[0].id });
        }
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
            <Form.Control type="date" value={this.state.date}
              name="date" onChange={this.handleInput} />
            {/* value = "2017-06-01" */}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridOperationType">
            <Form.Label>Operation Type</Form.Label>
            <Form.Select defaultValue={this.state.typeOperation} name="typeOperation" onChange={this.handleInput}>
              <option>INGRESO</option>
              <option>EGRESO</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridUsers">
            <Form.Label>Users</Form.Label>
            <Form.Select defaultValue={this.state.user_name} name="user_id" onChange={this.handleInput}>
              {this.state.users.map(u => {
                return <option key={u.id} id={u.id} value={u.id}>{u.name}  {u.lastname}</option>
              })}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
          <Col>
            <Button variant="primary" onClick={() => this.props.changeView('op')}>
              Back
            </Button>
          </Col>
          <Col>
            <Button variant="success" type="submit">
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  }
}

/*
class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Only letters";
      }
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      alert("Form submitted");
    } else {
      alert("Form has errors.");
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div>
        <form
          name="contactform"
          className="contactform"
          onSubmit={this.contactSubmit.bind(this)}
        >
          <div className="col-md-6">
            <fieldset>
              <input
                ref="name"
                type="text"
                size="30"
                placeholder="Name"
                onChange={this.handleChange.bind(this, "name")}
                value={this.state.fields["name"]}
              />
              <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
              <br />
              <input
                refs="email"
                type="text"
                size="30"
                placeholder="Email"
                onChange={this.handleChange.bind(this, "email")}
                value={this.state.fields["email"]}
              />
              <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
              <br />
              <input
                refs="phone"
                type="text"
                size="30"
                placeholder="Phone"
                onChange={this.handleChange.bind(this, "phone")}
                value={this.state.fields["phone"]}
              />
              <br />
              <input
                refs="address"
                type="text"
                size="30"
                placeholder="Address"
                onChange={this.handleChange.bind(this, "address")}
                value={this.state.fields["address"]}
              />
              <br />
            </fieldset>
          </div>
        </form>
      </div>
    );
  }
}

React.render(<Test />, document.getElementById("container"));

*/