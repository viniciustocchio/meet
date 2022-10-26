import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from "./mock-data";
import { extractLocations, getEvents,checkToken } from './api';
import {ErrorAlert} from "./Alert"
import './nprogress.css';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
// import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: mockData,
    locations: extractLocations(mockData),
    offlineText:""
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
  
 async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    let isTokenValid;
    if (accessToken && !navigator.onLine) {
      isTokenValid = true;
    } else {
      isTokenValid = (await checkToken(accessToken)).error ? false : true;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        offlineText: "Your're offline! The data was loaded from the cache.",
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
  return (
    <div className="App">
      <ErrorAlert text={this.state.offlineText}/>
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