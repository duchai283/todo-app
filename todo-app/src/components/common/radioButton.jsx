import React from 'react';

const RadioButton = props => {
  return (
    <div className="field">
      <div className="ui radio checkbox">
        <input
          type="radio"
          value={props.value}
          name={props.name}
          checked={props.isChecked}
          onChange={props.onChange}
          id={props.id}
        />
        <label htmlFor={props.id}>{props.value}</label>
      </div>
    </div>
  );
};

export default RadioButton;
