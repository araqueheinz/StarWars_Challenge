import React, {Component} from 'react';

// Import my starWars axios api
import starWars from '../../apis/starWars';

class MovieCreate extends Component {
  state = {
    planetsList: [],
    title: '',
    director: '',
    producer: '',
    planets: [],
    titleError: {
      error: false,
      msg: '',
    },
    directorError: {
      error: false,
      msg: '',
    },
    producerError: {
      error: false,
      mgs: '',
    },
  };

  componentDidMount = async () => {
    try {
      const response = await starWars.get ('/planets/');
      this.setState ({planetsList: response.data.results});
    } catch (err) {
      console.log (err.message);
    }
  };

  onSubmitHandler = event => {
    event.preventDefault ();
    if (
      this.state.titleError.error === true ||
      this.state.directorError.error === true ||
      this.state.producerError.error === true
    )
      return;
    this.props.onSubmitMovieCreate (this.state);
    this.setState ({
      title: '',
      director: '',
      producer: '',
      planets: [],
    });
  };

  onChangeHandler = event => {
    const value =
      event.target.value.charAt (0).toUpperCase () +
      event.target.value.slice (1);
    const name = event.target.name;
    this.setState ({[name]: value});
    this.checkValidity (name, value);
  };

  onChangeSelectHandler = event => {
    const newPlanetState = [...this.state.planets, event.target.value];
    this.setState ({planets: newPlanetState});
  };

  checkValidity = (name, value) => {
    if (name === 'title' && this.state.title.length < 3) {
      this.setState ({
        titleError: {
          error: true,
          msg: '* Please write more title of your movie, 3 or more characters',
        },
      });
    } else if (name === 'director' && this.state.director.length < 3) {
      this.setState ({
        directorError: {
          error: true,
          msg: '* Please write the name of the director,  3 or more characters',
        },
      });
    } else if (name === 'producer' && this.state.producer.length < 3) {
      this.setState ({
        producerError: {
          error: true,
          msg: '* Please write the name of the producer, 3 or more characters',
        },
      });
    }
    if (name === 'title' && this.state.title.length > 3) {
      this.setState ({
        titleError: {
          error: false,
          msg: '',
        },
      });
    } else if (name === 'director' && this.state.director.length > 3) {
      this.setState ({
        directorError: {
          error: false,
          msg: '',
        },
      });
    } else if (name === 'producer' && this.state.producer.length > 3) {
      this.setState ({
        producerError: {
          error: false,
          msg: '',
        },
      });
    }
  };

  renderPlanets = () => {
    return this.state.planetsList.map ((element, i) => {
      return <option key={i} value={element.url}>{element.name}</option>;
    });
  };

  render () {
    return (
      <form onSubmit={this.onSubmitHandler} className="ui form">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={this.onChangeHandler}
            onBlur={this.onChangeHandler}
            value={this.state.title}
            placeholder="title..."
          />
          <span>
            {this.state.titleError.error ? this.state.titleError.msg : ''}
          </span>
        </div>
        <div className="field">
          <label>Director</label>
          <input
            type="text"
            name="director"
            onChange={this.onChangeHandler}
            onBlur={this.onChangeHandler}
            value={this.state.director}
            placeholder="director..."
          />
          <span>
            {this.state.directorError.error ? this.state.directorError.msg : ''}
          </span>
        </div>
        <div className="field">
          <label>Producer</label>
          <input
            type="text"
            name="producer"
            onChange={this.onChangeHandler}
            onBlur={this.onChangeHandler}
            value={this.state.producer}
            placeholder="producer..."
          />
          <span>
            {this.state.producerError.error ? this.state.producerError.msg : ''}
          </span>
        </div>
        <div className="field" />
        <label>Select your planet:</label>
        <select name="cars" id="cars" onChange={this.onChangeSelectHandler}>
          {this.renderPlanets ()}
        </select>
        <div className="field">
          <br />
          <button type="submit" className="ui right floated button">
            Add +
          </button>
        </div>
      </form>
    );
  }
};

export default MovieCreate;
