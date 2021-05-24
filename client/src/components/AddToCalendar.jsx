import React from 'react';

const AddToCalendar = (props) => {
  return (
    <div>
      <h2>Weekly Ingredients</h2>
      <ul>
        {props.schedule.map((item, index) => item.ingredientLines.map((ingredient, index) => <li key={index}>{ingredient}</li>))}
      </ul>
    </div>
  )
}

export default AddToCalendar;