import React, { Component } from 'react';
import {ErrorAlert} from "./Alert"
export class NumberOfEvents extends Component {
  
  state = { 
    numberOfEvents: 32,
   infoText: '' 
  };

  inputChanged = (e) => {
    let inputValue = e.target.value;
    if (inputValue >= 33 || inputValue <= 0) {
      this.setState({
        numberOfEvents: inputValue,
        infoText: 'Please enter a number between 1 - 32.',
      });
    } else {
      this.setState({
        numberOfEvents: inputValue,
        infoText: ' ',
      });
    }

  };

  render() {
    return (
      <div className='numberOfEvents'>
        <ErrorAlert text={this.state.infoText}/>
        <br/>
        <label>
          Number of Events:
          <input
            type='number'
            className='event-number'
            value={this.state.numberOfEvents}
            onChange={this.inputChanged}
            
          />
        </label>
      </div>
    );
  }
}
export default NumberOfEvents;