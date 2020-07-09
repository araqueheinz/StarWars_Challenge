import _ from 'lodash';
import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';

class PlanetsTable extends Component {
  state = {
    column: null,
    data: [],
    direction: null,
  };

  handleSort = clickedColumn => () => {
    const {column, data, direction} = this.state;

    if (column !== clickedColumn) {
      this.setState ({
        column: clickedColumn,
        data: _.sortBy (this.props.planetsData, [clickedColumn]),
        direction: 'ascending',
      });

      return;
    }

    this.setState ({
      data: data.reverse (),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  render () {
    const {column, data, direction} = this.state;

    return (
      <div>
        <h4>Planets:</h4>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort ('name')}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'population' ? direction : null}
                onClick={this.handleSort ('population')}
              >
                population
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'diameter' ? direction : null}
                onClick={this.handleSort ('diameter')}
              >
                diameter
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'climate' ? direction : null}
                onClick={this.handleSort ('climate')}
              >
                climate
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'terrain' ? direction : null}
                onClick={this.handleSort ('terrain')}
              >
                terrain
              </Table.HeaderCell>

            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map (
              data.length === 0 ? this.props.planetsData : data,
              ({name, population, diameter, climate, terrain}) => (
                <Table.Row key={name}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{population}</Table.Cell>
                  <Table.Cell>{diameter}</Table.Cell>
                  <Table.Cell>{climate}</Table.Cell>
                  <Table.Cell>{terrain}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
};

export default PlanetsTable;
