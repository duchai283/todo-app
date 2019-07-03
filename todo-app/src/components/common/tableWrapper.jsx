import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import Checkbox from '../common/checkBox';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const TableWrapper = ({
  todos,
  onDelete,
  onEdit,
  onCheckBoxChange,
  onCheckBoxAll,
  sortColum,
  onSort
}) => {
  const colums = [
    {
      path: 'check',
      name: (
        <Checkbox
          label="All"
          value="checkall"
          isChecked={false}
          onChange={onCheckBoxAll}
        >
          Check/UnCheck all
        </Checkbox>
      ),
      content: todo => {
        return (
          <Checkbox
            value={todo.id}
            isChecked={todo.isChecked}
            onChange={onCheckBoxChange}
          />
        );
      }
    },
    {
      path: 'title',
      name: 'Name'
    },
    {
      path: 'status',
      name: 'Status'
    },
    {
      path: 'startDate',
      name: 'Time'
    },
    {
      path: 'day',
      name: 'Warming day'
    },
    {
      path: 'description',
      name: 'Description'
    },
    {
      path: 'operation',
      name: 'Operation',
      content: todo => {
        return (
          <div className="centered">
            <Link
              className="ui primary button margin-bottom-small "
              to={`/create/${todo.id}?isEdit=true`}
            >
              Edit
            </Link>
            <Button secondary onClick={onDelete(todo.id, 'delete')}>
              Delete
            </Button>
          </div>
        );
      }
    }
  ];
  return (
    <Table celled color="purple">
      <TableHeader colums={colums} sortColum={sortColum} onSort={onSort} />
      <TableBody colums={colums} todos={todos} />
    </Table>
  );
};

export default TableWrapper;
