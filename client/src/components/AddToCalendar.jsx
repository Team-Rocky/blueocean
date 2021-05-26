import React from 'react';

const AddToCalendar = (props) => {
  const days = Object.keys(props.schedule);
  const ingredients = {
  };
  days.forEach((day => {
    if (ingredients[day] === undefined) {
      ingredients[day] = {};
      props.schedule[day].forEach((meal,index) => {
        // ingredients[day].push(meal.ingredientList);
        meal.ingredientList.forEach((ingredient) => {
          if (ingredients[day][ingredient] === undefined) {
            ingredients[day][ingredient] = {item: '', count: 0}
            ingredients[day][ingredient].item = ingredient;
            ingredients[day][ingredient].count = 1;
          } else {
            ingredients[day][ingredient].count++
          }
        });
      });
    }
  }));
// console.log(ingredients)
  return (
    <div>
      <h2>Weekly Ingredients</h2>
      <ul>
        {days.map((day, index) => (
            <li key={index} style={{listStyle: 'none'}}>
              <h3>{day}</h3>
              <ul>
                {Object.keys(ingredients[day]).map((item, index)=> <li key={index}>
                  {item} x{ingredients[day][item].count.toString()}
                </li>)}
              </ul>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default AddToCalendar;