import React, { Component } from 'react';

const img =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/128px-React-icon.svg.png';

const categoryCard = props => {
  console.log(props);
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={img} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.category.name}</h5>
        <p className="card-text">{props.category.description}</p>
        <a href="#" className="btn btn-info">
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default categoryCard;
