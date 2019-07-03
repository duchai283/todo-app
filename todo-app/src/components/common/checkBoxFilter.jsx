import React from 'react';
import CheckBox from './checkBox';

const CheckBoxFilter = ({ options, onChange }) => {
  return (
    <React.Fragment>
      {options.map(option => {
        return <CheckBox {...option} onChange={onChange} key={option.id} />;
      })}
    </React.Fragment>
  );
};

export default CheckBoxFilter;
