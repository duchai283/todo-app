import React from 'react';
import { Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const TimePicker = ({ onChangeDate, label, value }) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <DatePicker
        selected={value}
        onChange={onChangeDate}
        minDate={Date.now()}
      />
    </Form.Field>
  );
};

export default TimePicker;
