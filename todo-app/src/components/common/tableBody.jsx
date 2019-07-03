import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import dateFns from 'date-fns';

class TableBody extends Component {
  renderCell = (todo, colum) => {
    if (colum.content && (colum.path === 'operation' || colum.path === 'check'))
      return colum.content(todo);

    let value = _.get(todo, colum.path);

    if (colum.path === 'startDate') {
      if (value) {
        return (value = dateFns.format(value, 'MM/DD/YY'));
      }
      return;
    }
    if (colum.path === 'day') {
      value = value.join(' , ');
    }
    let status = todo.status ? (
      <Icon name="chevron down" color="green" size="large" />
    ) : (
      <Icon name="warning circle" color="red" size="large" />
    );

    if (colum.path === 'status') value = status;

    if (!todo.status && colum.path !== 'status') {
      value = <span style={{ textDecoration: 'line-through' }}>{value}</span>;
    }

    return value;
  };

  render() {
    const { todos, colums } = this.props;

    return (
      <Table.Body>
        {todos.length > 0 ? (
          todos.map(todo => (
            <Table.Row key={todo.id}>
              {colums.map(colum => (
                <Table.Cell key={colum.path} className="maxwidth">
                  {this.renderCell(todo, colum)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell style={{ textAlign: 'center' }}>
              No data available
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    );
  }
}

export default TableBody;
