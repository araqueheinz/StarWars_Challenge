// Import React library
import React from 'react';

class SearchBar extends React.Component {
  state = {
    term: '',
    category: '',
  };

  onInputChangeHandler = event => {
    const term = event.target.value;
    this.setState ({term});
  };

  onSelectChangeHandler = event => {
    const category = event.target.value;
    this.setState ({category});
  };

  onFormSubmitHandler = event => {
    event.preventDefault ();
    this.props.search (this.state);
    this.setState ({
      term: '',
      category: '',
    });
  };

  render () {
    return (
      <div className="ui action input">
        <form onSubmit={this.onFormSubmitHandler} className="ui form">
          <div className="fields">
            <select
              onChange={this.onSelectChangeHandler}
              value={this.state.category}
            >
              <option value="" defaultValue>Category</option>
              <option value="films">Films</option>
              <option value="people">People</option>
              <option value="planets">Planets</option>
              <option value="species">Species</option>
              <option value="starships">Starships</option>
              <option value="vehicles">Vehicles</option>
            </select>
            <input
              type="text"
              onChange={this.onInputChangeHandler}
              value={this.state.term}
              placeholder="Search..."
            />
            <button type="submit" className="ui button">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
