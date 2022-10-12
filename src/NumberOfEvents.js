import React, { Component } from 'react';

export class NumberOfEvents extends Component {
  
  state = { numberOfEvents: 32 };

  inputChanged = (e) => {
    const value = e.target.value;
    this.setState({ numberOfEvents: value });
  };

  render() {
    return (
      <div className='numberOfEvents'>
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