import React from 'react';
import { Operation } from '../operation/Operation';
import { Create } from '../operation/create';

export class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'op',
            operationId: ''
        }
        this.changeView = this.changeView.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    changeView(active) {
        if (active === 'op' || active === 'co')
            this.setState({ active: active });
    }

    setOperation(operationId) {
        this.setState({ operationId: operationId });
        console.log('setOperation: id ' + operationId);
    }

    formatDate() {
        return new Date().toISOString().slice(0, 10);
    }

    render() {
        if (this.state.active === 'op')
            return <Operation changeView={this.changeView} callbackSetOperation={this.setOperation} />
        if (this.state.active === 'co')
            return <Create changeView={this.changeView} operationId={this.state.operationId} date={this.formatDate()} />
        return null;
    }
}