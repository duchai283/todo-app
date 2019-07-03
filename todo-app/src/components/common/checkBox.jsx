import React from 'react';

const CheckBox = props => {
  return (
    <div className="ui checkbox left">
      <input
        type="checkbox"
        checked={props.value !== 'checkall' ? props.isChecked : null}
        value={props.value}
        onChange={props.onChange}
      />
      <label>{props.label}</label>
    </div>
  );
};

export default CheckBox;
