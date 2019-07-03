import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';

class TableHeader extends Component {
  raiseSort = columPath => {
    const { sortColum } = this.props;

    if (columPath === sortColum.path) {
      sortColum.order = sortColum.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColum.path = columPath;
      sortColum.order = 'asc';
    }
    this.props.onSort(sortColum);
  };

  renderIconSort = (sortColum, columPath) => {
    if (
      sortColum.path !== columPath ||
      columPath === 'operation' ||
      columPath === 'check'
    )
      return null;
    if (sortColum.order === 'asc')
      return (
        <Icon className="inline left-small" name="chevron up" size="small" />
      );
    return (
      <Icon className="inline left-small" name="chevron down" size="small" />
    );
  };

  render() {
    const { colums, sortColum } = this.props;
    return (
      <Table.Header>
        <Table.Row>
          {colums.map(colum => (
            <Table.HeaderCell
              key={colum.name}
              className="maxwidth"
              onClick={() => this.raiseSort(colum.path)}
            >
              {colum.name} {this.renderIconSort(sortColum, colum.path)}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    );
  }
}

export default TableHeader;
