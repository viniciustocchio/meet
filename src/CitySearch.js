import React, { Component } from 'react';
import "./App.css";
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText: ''
  }

  inputChanged = (event) => {
  const value = event.target.value;
    this.setState({ query: value });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if(suggestions.length===0){
this.setState({
  query:value,
  infoText:'We can not find the city you are looking for. Please try another city'})

    }else{
      this.setState({
      query: value,
      suggestions,
      infoText:" "
    });  
    }
  
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });   

    this.props.updateEvents(suggestion);
  }

  render() {
    return (
      <div className="CitySearch">
        <InfoAlert  text={this.state.infoText}/>
        <br/>
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.inputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }}
          // InfoAlert text={this.state.infoText}
        />
        <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}>
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >{suggestion}</li>
          ))}
          <li onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;