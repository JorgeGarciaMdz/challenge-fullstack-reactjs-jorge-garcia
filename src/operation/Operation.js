import React from 'react';
import { Table, Button, Container, Row, Col, ButtonGroup } from 'react-bootstrap';

export class Operation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            operation: [],
            order: 'asc',
            limit: 2,
            offset: 0
        }

        this.pageBack = this.pageBack.bind(this);
        this.pageNext = this.pageNext.bind(this);
        this.fetchOperation = this.fetchOperation.bind(this);
        this.limitUp = this.limitUp.bind(this);
        this.limitDown = this.limitDown.bind(this);
    }

    pageNext() {
        if (this.state.operation.length === this.state.limit) {
            this.fetchOperation(this.state.order, this.state.limit, this.state.offset + 1);
            this.setState({ offset: this.state.offset + 1 })
        }
    }

    pageBack() {
        if (this.state.offset > 0) {
            this.fetchOperation(this.state.order, this.state.limit, this.state.offset - 1);
            this.setState({ offset: this.state.offset - 1 })
        }
    }

    limitUp() {
        if (this.state.operation.length >=  this.state.limit) {
            this.fetchOperation(this.state.order, this.state.limit + 1, this.state.offset);
            this.setState({
                limit: this.state.limit + 1
            });
        }
    }

    limitDown() {
        if (this.state.limit > 1) {
            this.fetchOperation(this.state.order, this.state.limit - 1, this.state.offset);
            this.setState({
                limit: this.state.limit - 1
            });
        }
    }

    componentDidMount() {
        this.fetchOperation(this.state.order, this.state.limit, this.state.offset);
    }

    componentDidUpdate() {
    }

    fetchOperation(order = 'asc', limit = 5, offset = 0) {
        let myHeaders = new Headers({
            "Content-Type": "application/json",
            "Connection": "keep-alive"
        });
        myHeaders.append('Accept', '*/*');
        const myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            // body: JSON.stringify({ order: "desc", limit: 10})
        };
        fetch(`http://127.0.0.1:3000/api/v1/operation?order=${order}&` +
            `limit=${limit}&offset=${offset}`, myInit)
            .then(res => res.json())
            .then(data => {
                this.setState({ operation: data });
            }).catch(e => {
                console.error('Error: ' + e);
            })
    }

    render() {
        return <div>
            <PageLimit pnext={this.pageNext} pback={this.pageBack} page={this.state.offset + 1}
                items={this.state.limit} limitUp={this.limitUp} limitDown={this.limitDown} />
            <TableOperation operation={this.state.operation}></TableOperation>
        </div>;
    }
}

function PageLimit(props) {
    return <Container>
        <Row>
            <Col >
                <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-dark" onClick={props.pback}>Back</Button>
                    <Button variant="outline-info" disabled>Page {props.page}</Button>
                    <Button variant="outline-dark" onClick={props.pnext}>Next</Button>
                </ButtonGroup>
            </Col>
            <Col>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-dark" onClick={props.limitUp}>Up</Button>
                    <Button variant="outline-info" disabled>Show Items {props.items}</Button>
                    <Button variant="outline-dark" onClick={props.limitDown}>Down</Button>
                </ButtonGroup>
            </Col>
        </Row>
    </Container>;
}

function TableOperation(props) {
    return <Table striped bordered hover>
        <TableHeadOperation></TableHeadOperation>
        <TableBodyOperation operation={props.operation} ></TableBodyOperation>
    </Table>;
}

function TableHeadOperation() {
    return <thead>
        <tr>
            <th>#</th>
            <th>Concept</th>
            <th>Amount</th>
            <th>Operation Type</th>
            <th></th>
        </tr>
    </thead>;
}

function TableBodyOperation(props) {
    return <tbody>
        <TableTrOperation operation={props.operation}></TableTrOperation>
    </tbody>;
}

function TableTrOperation(props) {
    if (props && props.operation instanceof Array) {
        return props.operation.map(t => {
            return <tr>
                <td>{t.id}</td>
                <td>{t.concept}</td>
                <td>{t.amount}</td>
                <td>{t.typeOperation}</td>
                <td>
                    <Container>
                        <Row>
                            <Col>
                                <Button variant="warning">Edit</Button>{' '}
                                <Button variant="danger">Delete</Button>
                            </Col>
                        </Row>
                    </Container>
                </td>
            </tr>
        });
    }
    return null;
}
