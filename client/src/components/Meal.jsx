import React from 'react';

const Meal = (props) => {
  return (
    <li style={{listStyle: 'none'}}>
      <h4>Name: {props.meal.name}</h4>
    </li>
  )
}
export default Meal;