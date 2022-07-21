import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../redux/actions';
import Button from './button';

class Calculator extends Component {
  state = {
  };

  render() { 
    return (
      <React.Fragment>

        <div className='container'>
          <div className="calculator">
            <div className="output">
                {this.props.expression}
            </div>
            <button onClick={this.props.clear}>AC</button>
            <button onClick={this.props.delete}>DEL</button>
            <Button data={"%"} />
            <Button data={"/"} />
            <Button data={"7"} />
            <Button data={"8"} />
            <Button data={"9"} />
            <Button data={"*"} />
            <Button data={"4"} />
            <Button data={"5"} />
            <Button data={"6"} />
            <Button data={"-"} />
            <Button data={"1"} />
            <Button data={"2"} />
            <Button data={"3"} />
            <Button data={"+"} />
            <Button data={"0"} />
            <Button data={"00"} />
            <Button data={"."} />
            <button onClick={this.props.evaluate}>=</button>
            <Button data={"("} />
            <Button data={")"} />
            <Button data = {"x"} />
            <button onClick={this.props.permutation}>ASC/DESC</button>
          </div>

          <div className="tips">
            <div className="tips-title">Tips</div>
            <div className="tips-content">{this.props.tips}</div>
          </div>

          <div className="history-record">
            <div className="history-record-title">History</div>
            <div className="history-record-content">
              {this.props.history}
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
      expression: state.expression,
      history: state.history,
      tips: state.tips,
  }
};

const mapDispatchToProps = {
  delete: () => {  /* 删除 */
      return {
          type: ACTIONS.DELETE,
      }
  },
  clear: () => {  /* 清空 */
      return {
          type: ACTIONS.CLEAR,
      }
  },
  evaluate: () => {  /* 计算 */
      return {
          type: ACTIONS.EVALUATE,
      }
  },
  permutation: () => {  /* 升降序切换 */
      return {
          type: ACTIONS.PERMUTATION,
      }
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
