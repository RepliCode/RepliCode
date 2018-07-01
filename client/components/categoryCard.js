import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const img =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/128px-React-icon.svg.png';

const categoryCard = props => {
  console.log(props);
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={img} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.category.name}</h5>
        <a href="#" className="btn btn-info">
          See Lessons
        </a>
      </div>
    </div>
  );
};

export default categoryCard;
