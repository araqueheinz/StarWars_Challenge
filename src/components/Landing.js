import React, {Component} from 'react';

// Import my starWars axios api
import starWars from '../apis/starWars';

// Import my components
import CollapsibleList from './CollapsibleList';
import MovieCreate from './MyStarWarsMovie/MovieCreate';
import SearchBar from './SearchBar/SearchBar';

class Landing extends Component {
  state = {
    films: [],
    searched: [],
    searchError: false,
    myOwnMovies: [
      {
        title: 'The Broken Force',
        episode_id: null,
        opening_crawl: '',
        director: 'Heinz Araque',
        producer: 'Oscar Araque',
        release_date: '',
        characters: [],
        planets: [
          'http://swapi.dev/api/planets/11/',
          'http://swapi.dev/api/planets/7/',
          'http://swapi.dev/api/planets/4/',
        ],
        starships: [],
        vehicles: [],
        species: [],
        created: '',
        edited: '',
        url: '',
      },
    ],
  };

  componentDidMount = async () => {
    try {
      const response = await starWars.get ('/films/');
      this.setState ({
        films: response.data.results,
      });
    } catch (err) {
      console.log (err.message);
    }
  };

  onSubmitMovieCreate = formValues => {
    const newMyOwnMovies = [...this.state.myOwnMovies, formValues];
    this.setState ({myOwnMovies: newMyOwnMovies});
  };

  searchResource = async values => {
    const {category, term} = values;
    try {
      const response = await starWars.get (`/${category}/?search=${term}`);
      this.setState ({searched: response.data.results});
    } catch (err) {
      console.log (err.message);
    }
  };

  render () {
    return (
      <section className="landing">
        <SearchBar search={this.searchResource} />
        {this.state.searched.length !== 0
          ? <CollapsibleList apiResponseData={this.state.searched} />
          : ''}
        <h2>Films</h2>
        <CollapsibleList apiResponseData={this.state.films} />
        <h2>My Own Films</h2>
        <CollapsibleList apiResponseData={this.state.myOwnMovies} />
        <h3>Add your own!</h3>
        <MovieCreate onSubmitMovieCreate={this.onSubmitMovieCreate} />
      </section>
    );
  }
}

export default Landing;
