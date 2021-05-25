import React from 'react';

const AddToCalendar = (props) => {
  const days = Object.keys(props.schedule);
  const ingredients = {
  };
  days.forEach((day => {
    if (ingredients[day] === undefined) {
      ingredients[day] = [];
      props.schedule[day].forEach((meal,index) => {
        ingredients[day].push(meal.ingredientList);
      });
    }
  }));

  return (
    <div>
      <h2>Weekly Ingredients</h2>
      <ul>
        {days.map((day, index) => (
            <li key={index} style={{listStyle: 'none'}}>
              <h3>{day}</h3>
              <ul>
                {ingredients[day].map((ingredients, index) => ingredients.map((ingredient, index) =>
                <li key={index}>{ingredient}</li>))}
              </ul>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default AddToCalendar;