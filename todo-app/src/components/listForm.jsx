import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import TimePicker from './common/timePicker';
import Input from './common/input';
import DropDownModal from './common/dropDown';
import TextAreare from './common/textArea';
import CbWeekDay from './common/cbWeekDay';
import { initialData } from '../services/initialForm';
import { initWeekdays } from '../services/weekday';
import { getTodoByid } from '../services/todoService';
import queryString from 'query-string';
import dateFns from 'date-fns';

class ListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initialData,
      weekdays: initWeekdays(),
      errors: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { isEdit } = queryString.parse(this.props.location.search);
    if (id && isEdit) {
      const todo = getTodoByid(id);
      if (todo) {
        todo.startDate = dateFns.parse(todo.startDate);
        this.getWeek(todo.day);
        this.setState({ data: todo, isEdit });
      } else {
        this.props.history.push('/not-found');
      }
    }
  }

  handleChangeDate = date => {
    const data = { ...this.state.data };
    data['startDate'] = date;
    this.setState({ data });
  };

  handleChange = (e, { value, name }) => {
    const data = { ...this.state.data };
    const error = this.validateInputChange(value, name);
    if (error) this.setState({ errors: error });

    data[name] = value;

    this.setState({ data: data });
  };

  validateInputChange = (value, name) => {
    const error = { ...this.state.errors };
    if (name === 'status' || name === 'date') return;
    if (value.trim() === '') {
      error[name] = name + ' is required';
    }
    return error;
  };

  validate = () => {
    const errors = {};
    const { title, description } = this.state.data;

    if (title.trim() === '') {
      errors.title = 'Title is required!';
    }
    if (description.trim() === '') {
      errors.description = 'Description is required!';
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };

  getDay() {
    const weekdays = [...this.state.weekdays];
    let arrayDay = [];
    weekdays.forEach(day => {
      if (day.isChecked) {
        arrayDay.push(day.value);
      }
    });
    return arrayDay;
  }

  getWeek(arrayDay) {
    let weekdays = this.state.weekdays;
    this.getDefaultWeek(weekdays);

    arrayDay.forEach(day => {
      for (let item of weekdays) {
        if (item.value === day) {
          item.isChecked = true;
        }
      }
    });
    return weekdays;
  }

  getDefaultWeek(weekdays) {
    weekdays.forEach(item => {
      item.isChecked = false;
    });
  }

  handleWeekdayChange = ({ target: checkbox }) => {
    const weekdays = [...this.state.weekdays];
    weekdays.forEach(day => {
      if (day.value === checkbox.value) {
        day.isChecked = checkbox.checked;
      }
    });
    this.setState({ weekdays });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });

    if (errors) return;

    let data = { ...this.state.data };
    data.day = this.getDay();

    this.props.doSubmit(data, 'submit', this.props);

    this.getDefaultWeek(this.state.weekdays);
    this.setState({
      data: initialData
    });
  };

  handleClear = e => {
    e.preventDefault();
    this.setState({
      data: initialData
    });
  };

  render() {
    const { id, title, startDate, description, status } = this.state.data;
    const { errors, weekdays, isEdit } = this.state;
    const options = [
      { key: 'true', value: true, text: 'TRUE' },
      { key: 'false', value: false, text: 'FALSE' }
    ];
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginBottom: 20 }}>
        <Input name="id" value={id} onChange={this.handleChange} />
        <Input
          name="title"
          value={title}
          label="Name"
          onChange={this.handleChange}
          error={errors && errors.title}
        />
        <TimePicker
          value={startDate}
          label="Time"
          onChangeDate={this.handleChangeDate}
        />
        <DropDownModal
          placeholder="Choose Status"
          options={options}
          onChange={this.handleChange}
          name="status"
          label="Status"
          value={status}
        />

        <TextAreare
          label="Description"
          name="description"
          placeholder="Write something"
          value={description}
          onChange={this.handleChange}
          error={errors && errors.description}
        />
        <Form.Field>
          <CbWeekDay onChange={this.handleWeekdayChange} weekdays={weekdays} />
        </Form.Field>
        <Button>{!isEdit ? 'Submit' : 'Update'}</Button>
        <Button onClick={this.handleClear}>Clear</Button>
      </Form>
    );
  }
}

export default ListForm;
