import React from 'react';
import { TextArea, Form } from 'semantic-ui-react';

const TextAreare = ({ label, name, value, onChange, placeholder, error }) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <TextArea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <p className="error">{error}</p>}
    </Form.Field>
  );
};

export default TextAreare;
