import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

const DropDownModal = ({
  label,
  name,
  options,
  onChange,
  placeholder,
  value
}) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <Dropdown
        placeholder={placeholder}
        fluid
        selection
        options={options}
        onChange={onChange}
        value={value}
        name={name}
      />
    </Form.Field>
  );
};

export default DropDownModal;
