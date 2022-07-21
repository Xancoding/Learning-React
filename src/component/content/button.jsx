import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../redux/actions';

class Button extends Component {
    state = {  };

    render() { 
        return (
            <button
                onClick={() => this.props.add(this.props.data)}
            >
                {this.props.data}
            </button>
        );
    }
}

const mapDispatchToProps = {
    add: data => {
        return {
            type: ACTIONS.ADD,
            data: data,
        }
    }
}

export default connect(null, mapDispatchToProps)(Button);
