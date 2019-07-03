import React from 'react';
import RaidioButton from './radioButton';

const RadioFilter = ({ options, onChange }) => {
  return (
    <div className="ui form inline left">
      <div className="inline fields">
        <label>Search By : </label>
        {options.map(option => {
          return (
            <RaidioButton key={option.id} {...option} onChange={onChange} />
          );
        })}
      </div>
    </div>
  );
};

export default RadioFilter;
