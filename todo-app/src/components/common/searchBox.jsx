import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="ui search inline">
      <div className="ui icon input">
        <input
          className="prompt"
          type="text"
          placeholder="...search"
          value={value}
          onChange={e => onChange(e)}
        />
        <i className="search icon" />
      </div>
    </div>
  );
};

export default SearchBox;
