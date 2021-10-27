import React from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

export class Operation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            operation: [],
            order: 'asc',
            limit: 4,
            offset: 0
        }

        this.pageBack = this.pageBack.bind(this);
        this.pageNext = this.pageNext.bind(this);
        this.fetchOperation = this.fetchOperation.bind(this);
    }

    pageNext() {
        if (this.state.operation.length === this.state.limit) {
            this.setState({ offset: (this.state.offset + 1) });
            this.componentDidUpdate();
        }
    }

    pageBack() {
        if (this.state.offset > 0) {
            this.setState({ offset: (this.state.offset - 1) });
            this.componentDidUpdate();
        }
    }

    componentDidMount() {
        this.fetchOperation();
    }

    componentDidUpdate(){
        this.fetchOperation()
    }

    fetchOperation() {
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
        fetch(`http://127.0.0.1:3000/api/v1/operation?order=${this.state.order}&` +
            `limit=${this.state.limit}&offset=${this.state.offset}`, myInit)
            .then(res => res.json())
            .then(data => {
                this.setState({ operation: data });
            }).catch(e => {
                console.error('Error: ' + e);
            })
    }

    render() {
        return <div>
            <PageLimit pnext={this.pageNext} pback={this.pageBack} page={this.state.offset + 1} />
            <TableOperation operation={this.state.operation}></TableOperation>
        </div>;
    }
}

function PageLimit(props) {
    return <Container>
        <Row xs="auto">
            <Col>
                <Button variant="outline-dark" onClick={props.pback}>Back</Button>
            </Col>
            <Col>
                <Button variant="outline-info" disabled>Page {props.page}</Button>{' '}</Col>
            <Col>
                <Button variant="outline-dark" onClick={props.pnext}>Next</Button>
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
