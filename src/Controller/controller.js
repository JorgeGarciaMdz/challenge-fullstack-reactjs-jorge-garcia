import React from 'react';
import { Operation } from '../operation/Operation';
import { Create } from '../operation/create';
import { User } from '../user/user';
import { UserCreate } from '../user/userCreate';

export class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'op',
            operationId: '',
            userId: null
        }
        this.changeView = this.changeView.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.setUser = this.setUser.bind(this);
    }

    changeView(active) {
        if (active === 'op' || active === 'co' || active === 'us' || active === 'cu')
            this.setState({ active: active });
    }

    setOperation(operationId) {
        this.setState({ operationId: operationId});
    }

    setUser( userId ){
        this.setState({ userId: userId} );
    }

    formatDate() {
        return new Date().toISOString().slice(0, 10);
    }

    render() {
        if (this.state.active === 'op')
            return <Operation changeView={this.changeView} callbackSetOperation={this.setOperation} />
        if (this.state.active === 'co')
            return <Create changeView={this.changeView} operationId={this.state.operationId} date={this.formatDate()} />
        if (this.state.active === 'us')
            return <User changeView={this.changeView} setUser={this.setUser}/>
        if (this.state.active === 'cu')
            return <UserCreate changeView={this.changeView} userId = {this.state.userId} setUser={this.setUser}/>
        return null;
    }
}