import React, { Component } from 'react';
import TableWrapper from './common/tableWrapper';
import { Button, Grid } from 'semantic-ui-react';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import RadioFilter from './common/radioFilter';

class List extends Component {
  render() {
    const {
      todos,
      onDelete,
      onEdit,
      onCheckBoxChange,
      onCheckAll,
      isCheck,
      onCheckBoxAll,
      sortColum,
      onSort,
      onDeleteAll,
      totalCount,
      pageSize,
      onPageChange,
      currentPage,
      query,
      onSearchChange,
      optionsRadio,
      onChangeRadio
    } = this.props;
    return (
      <React.Fragment>
        <Grid.Row columns={2}>
          <SearchBox value={query} onChange={onSearchChange} />
          <RadioFilter options={optionsRadio} onChange={onChangeRadio} />
        </Grid.Row>
        <TableWrapper
          todos={todos}
          onDelete={onDelete}
          onEdit={onEdit}
          onCheckBoxChange={onCheckBoxChange}
          onCheckBoxAll={onCheckBoxAll}
          onCheckAll={onCheckAll}
          isCheck={isCheck}
          sortColum={sortColum}
          onSort={onSort}
        />
        <Pagination
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
        <Button className="ui right floated" onClick={onDeleteAll('deleteall')}>
          Delete ALL
        </Button>
      </React.Fragment>
    );
  }
}

export default List;
