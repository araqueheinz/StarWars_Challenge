import React, {Component} from 'react';

// import axios
import axios from 'axios';

// Import accordion from semantic UI
import {Accordion, Icon} from 'semantic-ui-react';

// Import my components
import PlanetsTable from './PlanetsTable';

class CollapsibleList extends Component {
  state = {
    activeIndex: null,
    planets: [],
    planetsData: [],
  };

  clickHandler = (e, titleProps) => {
    const {index} = titleProps;
    const {activeIndex} = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState ({activeIndex: newIndex});

    if (this.props.apiResponseData[index].planets) {
      this.retrievePlanets (this.props.apiResponseData[index].planets);
    }
  };

  retrievePlanets = async items => {
    try {
      const response = await Promise.all (
        items.map (element => {
          return axios.get (element);
        })
      );
      this.setState ({planets: response});
      this.createDataTable ();
    } catch (err) {
      console.log (err.message);
    }
  };

  createDataTable = () => {
    const tableData = this.state.planets.map (element => {
      return {
        name: element.data.name,
        population: element.data.population,
        diameter: element.data.diameter,
        climate: element.data.climate,
        terrain: element.data.terrain,
      };
    });
    this.setState ({planetsData: tableData});
  };

  // This needs work and refinement
  renderProperties = () => {
    return this.props.apiResponseData.map ((element, index) => {
      const elementEntries = Object.entries (element);
      return elementEntries.map ((e, i) => {
        return <li key={i + 10}> {e.join (' : ')}</li>;
      });
    });
  };

  renderList = activeIndex => {
    return this.props.apiResponseData.map ((element, index) => {
      return (
        <div key={index}>
          <Accordion.Title
            active={activeIndex === index}
            index={index}
            onClick={this.clickHandler}
          >
            <Icon name="dropdown" />
            {element.title ? element.title : element.name}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === index}>
            {/* <ul>
              {this.renderProperties()}
            </ul> */}
            {/* FILMS */}
            <p>{element.director ? `Director: ${element.director}` : ''}</p>
            <p>{element.producer ? `Producer: ${element.producer}` : ''}</p>
            <p>
              {element.release_date
                ? `Release Date: ${element.release_date}`
                : ''}
            </p>
            {/* PEOPLE */}
            <p>{element.height ? `Height: ${element.height}` : ''}</p>
            <p>{element.mass ? `Mass: ${element.mass}Kg` : ''}</p>
            <p>
              {element.hair_color ? `Hair color: ${element.hair_color}` : ''}
            </p>
            <p>
              {element.skin_color ? `Skin color: ${element.skin_color}` : ''}
            </p>
            <p>{element.eye_color ? `Eye color: ${element.eye_color}` : ''}</p>
            <p>
              {element.birth_year ? `Birth year: ${element.birth_year}` : ''}
            </p>
            <p>{element.gender ? `Gender: ${element.gender}` : ''}</p>
            {/* SPECIES */}
            <p>
              {element.classification
                ? `Classification: ${element.classification}`
                : ''}
            </p>
            <p>
              {element.designation ? `Designation: ${element.designation}` : ''}
            </p>
            <p>
              {element.average_height
                ? `Average height: ${element.average_height}`
                : ''}
            </p>
            <p>
              {element.skin_colors ? `Skin colors: ${element.skin_colors}` : ''}
            </p>
            <p>{element.language ? `Language: ${element.language}` : ''}</p>
            {/* STARSHIPS */}
            <p>{element.model ? `Model: ${element.model}` : ''}</p>
            <p>
              {element.manufacturer
                ? `Manufacturer: ${element.manufacturer}`
                : ''}
            </p>
            <p>
              {element.cost_in_credits
                ? `Cost in credits: ${element.cost_in_credits}`
                : ''}
            </p>
            <p>
              {element.max_atmosphering_speed
                ? `Max atmosphering speed: ${element.max_atmosphering_speed}`
                : ''}
            </p>
            <p>{element.crew ? `Crew: ${element.crew}` : ''}</p>
            <p>
              {element.cargo_capacity
                ? `Cargo capacity: ${element.cargo_capacity}`
                : ''}
            </p>
            {/* VEHICLES */}
            <p>{element.model ? `Model: ${element.model}` : ''}</p>
            <p>
              {element.manufacturer
                ? `Manufacturer: ${element.manufacturer}`
                : ''}
            </p>
            <p>
              {element.cost_in_credits
                ? `Cost in credits: ${element.cost_in_credits}`
                : ''}
            </p>
            <p>
              {element.max_atmosphering_speed
                ? `Max atmosphering speed: ${element.max_atmosphering_speed}`
                : ''}
            </p>
            <p>{element.length ? `Length: ${element.length}` : ''}</p>
            <p>{element.crew ? `Crew: ${element.crew}` : ''}</p>
            <p>
              {element.passengers ? `Passengers: ${element.passengers}` : ''}
            </p>
            <p>
              {element.cargo_capacity
                ? `Cargo capacity: ${element.cargo_capacity}`
                : ''}
            </p>
            {/* PLANETS */}
            <p>
              {element.rotation_period
                ? `Rotation_period: ${element.rotation_period}`
                : ''}
            </p>
            <p>
              {element.orbital_period
                ? `Orbital_period: ${element.orbital_period}`
                : ''}
            </p>
            <p>{element.diameter ? `Diameter: ${element.diameter}` : ''}</p>
            <p>{element.climate ? `Climate: ${element.climate}` : ''}</p>
            <p>{element.gravity ? `Gravity: ${element.gravity}` : ''}</p>
            <p>{element.terrain ? `Terrain: ${element.terrain}` : ''}</p>

            {this.state.planetsData.length > 0
              ? <PlanetsTable planetsData={this.state.planetsData} />
              : ''}
          </Accordion.Content>
        </div>
      );
    });
  };

  render () {
    const {activeIndex} = this.state;

    return (
      <Accordion styled>
        {this.renderList (activeIndex)}
      </Accordion>
    );
  }
}

export default CollapsibleList;
