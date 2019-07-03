import React from 'react';
import { Form } from 'semantic-ui-react';

const Input = ({ name, value, label, onChange, error }) => {
  return (
    <Form.Field className={name === 'id' ? 'hidden' : ''}>
      <label>{label}</label>
      <Form.Input
        placeholder={label}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <p className="error">{error}</p>}
    </Form.Field>
  );
};

export default Input;
