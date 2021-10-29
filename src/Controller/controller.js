import React from 'react';
import { Operation } from '../operation/Operation';
import { Create } from '../operation/create';

export class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'op'
        }
        this.changeView = this.changeView.bind(this);
    }
    changeView(active) {
        if (active === 'op' || active === 'co')
            this.setState({ active: active });
    }

    render() {
        if (this.state.active === 'op')
            return <Operation changeView={this.changeView} />
        if (this.state.active === 'co')
            return <Create changeView={this.changeView} />
        return null;
    }
}