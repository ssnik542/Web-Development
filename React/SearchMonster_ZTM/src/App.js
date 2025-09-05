import React, { Component } from 'react';
import { CardList } from './components/card-list/cars-list.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      avengers: [],
      searchField: ''
    };
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response =>
        response.json()).then(user => this.setState({ avengers: user }));

  }
  render() {
    const { avengers, searchField } = this.state;
    const filteredavengers = avengers.filter(avenger =>
      avenger.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <input
          type='search'
          placeholder='search monsters 🔎'
          onChange={e => this.setState({ searchField: e.target.value })} />
        <CardList avengers={filteredavengers} />
      </div>
    );
  }
}

export default App;
