import React from 'react';  //Import relevant components
import './SearchBar.css';  //Import relevant stylesheet

class SearchBar extends React.Component {  //Declare component
  constructor(props) {  //create constructor method using props as a property
    super(props);  //import properties from parent
    this.state = {  //set component state
      term: '',
      location: '',
      sortBy: 'best_match'
    };
    this.handleSortByChange = this.handleSortByChange.bind(this);  //bind this method
    this.handleTermChange = this.handleTermChange.bind(this);  //bind this method
    this.handleLocationChange = this.handleLocationChange.bind(this);  //bind this method
    this.handleSearch = this.handleSearch.bind(this);  //bind this method
    this.sortByOptions ={  //Create sortByOptions object, moved into constructor rather than having external variable
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active'
    }
    return '';
  }

  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption});
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return <li key={sortByOptionValue}
                 className={this.getSortByClass(sortByOptionValue)}
                 onClick={this.handleSortByChange}>
                 {sortByOption}</li>;
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
          <input placeholder="Where?" onChange={this.handleLocationChange}/>
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;
