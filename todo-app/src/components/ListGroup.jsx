import React from 'react';
import { NavLink } from 'react-router-dom';
const ListGroup = ({ onOpen }) => {
  return (
    <div className="ui secondary vertical pointing menu">
      <NavLink to="/" className="active item">
        Home
      </NavLink>
      <NavLink to="create" className="item">
        <div>Create Todo</div>
      </NavLink>
    </div>
  );
};

export default ListGroup;
