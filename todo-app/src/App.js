import React, { Component } from 'react';
import './App.css';
import List from './components/list';
import ListForm from './components/listForm';
import ListGroup from './components/ListGroup';
import _ from 'lodash';
import dateFns from 'date-fns';
import { Grid, Confirm } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import { initialData } from './services/initialForm';
import { paginate } from './services/paginate';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  getTodos,
  deleteTodo,
  saveTodo,
  updateTodo,
  initValues
} from './services/todoService';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './components/common/pagNotFound';

class App extends Component {
  state = {
    data: getTodos(),
    isCheck: false, // check
    open: false, // open Modal Confirm
    searchQuery: '',
    sortColum: { path: '', order: '' },
    selectedFilter: '',
    pageSize: 4,
    currentPage: 1,
    optionsRadio: [
      { id: 1, name: 'filter', value: 'title', isChecked: false },
      { id: 2, name: 'filter', value: 'description', isChecked: false }
    ]
  };

  componentDidMount() {
    // initValues();
    this.setState({ data: getTodos() });
  }

  handleDelete = (todoId, mode) => () => {
    this.setState({
      open: true,
      todo: todoId,
      mode
    });
  };

  doSubmit = (todo, mode, { history }) => {
    this.setState({
      open: true,
      todo: todo,
      history,
      mode
    });
  };

  handleDeleteAll = mode => () => {
    this.setState({
      open: true,
      mode
    });
  };

  handleOpen = mode => {
    this.setState({ mode, open: true });
  };

  handleConfirm = () => {
    const { mode, todo, history } = this.state;

    if (mode === 'deleteall') {
      const data = [...this.state.data];
      data.forEach(item => {
        if (item.isChecked) {
          deleteTodo(item.id);
        }
      });
      this.setState({ data: getTodos() });
    }
    if (mode === 'delete' && todo) {
      deleteTodo(todo);
      toast.success('Xoa todo thanh cong');
    }
    if (mode === 'submit' && todo) {
      if (todo.id) {
        updateTodo(todo);
        toast.success('Update todo thanh cong');
      } else {
        saveTodo(todo);
        toast.success('Them todo thanh cong');
      }
    }

    this.setState({ open: false, data: getTodos() });
    history.push('/');
  };
  handleCancel = () => this.setState({ isCheck: false, open: false });

  handleSearchChange = ({ target: input }) => {
    this.setState({ searchQuery: input.value });
  };

  handleChangeRadio = ({ target: radio }) => {
    const options = [...this.state.optionsRadio];
    options.forEach(option => {
      if (option.value === radio.value) {
        option.isChecked = radio.checked;
      } else {
        option.isChecked = !radio.checked;
      }
    });

    this.setState({ optionsRadio: options, selectedFilter: radio.value });
  };

  handleCheckBoxAll = ({ target: checkbox }) => {
    const data = [...this.state.data];
    data.forEach(item => (item.isChecked = checkbox.checked));
    this.setState({ data });
  };
  handleCheckBoxChange = ({ target: checkbox }) => {
    const data = [...this.state.data];

    data.forEach(item => {
      if (_.isEqual(item.id, checkbox.value)) {
        item.isChecked = checkbox.checked;
      }
    });
    this.setState({ data });
  };

  handleSortColum = sortColum => {
    this.setState({ sortColum });
  };
  handlePageChange = currentPage => {
    this.setState({ currentPage });
  };
  getDataPage = () => {
    const data = [...this.state.data];
    const {
      searchQuery,
      selectedFilter,
      sortColum,
      currentPage,
      pageSize
    } = this.state;

    let filtered = data;

    if (searchQuery) {
      if (selectedFilter)
        filtered = filtered.filter(item => {
          return item[selectedFilter]
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase().trim());
        });
    }

    let sorted = _.orderBy(
      filtered,
      [sortColum.path === 'status' ? 'status.value' : sortColum.path],
      [sortColum.order]
    );

    sorted = paginate(sorted, currentPage, pageSize);
    return { data: sorted };
  };

  render() {
    const {
      dataEdit,
      isCheck,
      open,
      optionsRadio,
      sortColum,
      pageSize,
      currentPage,
      searchQuery
    } = this.state;
    const { data } = this.getDataPage();

    return (
      <Grid>
        <ToastContainer />
        <Confirm
          open={open}
          onConfirm={this.handleConfirm}
          onCancel={this.handleCancel}
        />

        <Grid.Row columns={2}>
          <Grid.Column computer={3}>
            <ListGroup onOpen={this.handleOpen} />
          </Grid.Column>
          <Grid.Column computer={13}>
            <div>
              <Switch>
                <Route
                  path="/create/:id?"
                  render={props => (
                    <ListForm
                      doSubmit={this.doSubmit}
                      data={dataEdit}
                      {...props}
                    />
                  )}
                />
                <Route path="/not-found" component={PageNotFound} />
                <Route
                  path="/"
                  exact
                  render={props => (
                    <List
                      todos={data}
                      // search Query
                      query={searchQuery}
                      onSearchChange={this.handleSearchChange}
                      // radio butotn filter
                      optionsRadio={optionsRadio}
                      onChangeRadio={this.handleChangeRadio}
                      // delete
                      onDelete={this.handleDelete}
                      onCheckBoxChange={this.handleCheckBoxChange}
                      onCheckBoxAll={this.handleCheckBoxAll}
                      onCheckAll={this.handleCheckAll}
                      isCheck={isCheck}
                      onDeleteAll={this.handleDeleteAll}
                      // order colum
                      sortColum={sortColum}
                      onSort={this.handleSortColum}
                      // paginate
                      totalCount={getTodos().length}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={this.handlePageChange}
                      {...props}
                    />
                  )}
                />

                <Redirect to="/not-found" />
              </Switch>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default App;
