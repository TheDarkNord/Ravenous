import React from 'react';
import './App.css';

import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      businesses: []
    };
    this.searchYelp = this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    return Yelp.search(term, location, sortBy).then(businesses => {
      if(businesses !== undefined){
        this.setState({businesses: businesses})
      } else {
        alert(location + " returned with no results");  
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
          <SearchBar searchYelp={this.searchYelp}/>
          <BusinessList businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default App;
