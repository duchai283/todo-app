import React from 'react';
import CheckBox from './checkBox';
import PropTypes from 'prop-types';

const CbWeekDay = ({ onChange, weekdays }) => {
  return weekdays.map(day => {
    return (
      <CheckBox
        value={day.value}
        key={day.id}
        onChange={onChange}
        label={day.value}
        isChecked={day.isChecked}
      />
    );
  });
};

CbWeekDay.propTypes = {
  weekdays: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CbWeekDay;
