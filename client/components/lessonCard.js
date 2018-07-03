import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const img =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/512px-Unofficial_JavaScript_logo_2.svg.png';

const categoryCard = props => {
  console.log(props);
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={img} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.lesson.title}</h5>
        <a href={`/lessons/${props.lesson.id}`} className="btn btn-info">
          See Lessons
        </a>
      </div>
    </div>
  );
};

export default categoryCard;
