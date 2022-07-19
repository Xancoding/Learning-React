import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../redux/actions';

class DirectOperationButton extends Component {
  state = {  } 
  render() { 
      return (
          <button
              onClick={() => {
                  this.props.direct_evaluate(this.props.operation);
              }}
          >
              {this.props.operation}
          </button>
      );
  }
}

const mapDispatchToProps = {
  direct_evaluate: digit => {
    return {
      type: ACTIONS.direct_evaluate,
      operation: operation,
    }
  }
}

export default connect(null, mapDispatchToProps)(DirectOperationButton);