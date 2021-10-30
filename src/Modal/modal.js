import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export class ModalGeneric extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleCancel() {
        this.props.callback(false);
    }

    handleOk() {
        this.props.callback(true);
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.head? this.props.head: 'Title Modal'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.body? this.props.body: 'Message body'}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleOk}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>);
    }
}

