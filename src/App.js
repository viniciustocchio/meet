import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from "./mock-data";
import { extractLocations, getEvents } from './api';
import './nprogress.css';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
// import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: mockData,
    locations: extractLocations(mockData),
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') 
      ? events 
      : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }
  
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
  return (
    <div className="App">
      <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
      <NumberOfEvents />

      <h4>Events in each city</h4>

        {/* <div className="data-vis-wrapper">
          <EventGenre events={events} />
        <ResponsiveContainer height={400} >
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="number of events"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        </div> */}

        <ResponsiveContainer height={400} >
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="number of events"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      
      <EventList events={this.state.events}/>
    </div>
    );
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

}

export default App;