import React, { Component } from 'react';
import Calculator from './content/calculator';

class App extends Component {
  state = {  } 
  render() { 
    return (
      <React.Fragment>
        <Calculator />
      </React.Fragment>
    );
  }
}
export default App;