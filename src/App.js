import React, { Component } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import { mockData } from "./mock-data";
import { extractLocations } from './api';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  render() {
      const locations=extractLocations(mockData)

    return (
      <div className="App">
        <CitySearch  locations={locations}/>
        <NumberOfEvents />
        <EventList />
      </div>
    );
  }
}

export default App;