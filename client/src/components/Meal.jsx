import React from 'react';
import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios';

const deleteEntry = (id, callback, userId) => {
console.log('this is the recipe id! ', id)
  axios.delete(`api/recipes/calendar/${id}`)
  .then((response) => {
    // rerender
    console.log('this is callbacj:', callback)

   callback(userId)

  })
  .catch((err) => {
    console.log('err in axios.delete: ', err)
  })
}

const Meal = (props) => {
  let mealMinutes = new Date(props.meal.date).getMinutes();
  let mealHours = new Date(props.meal.date).getHours();
  mealHours < 10 ? mealHours = '0' + mealHours : mealHours;
  mealMinutes < 10 ? mealMinutes = '0' + mealMinutes : mealMinutes;
  const mealTime = `${mealHours}:${mealMinutes}`;

  const startTimeSec = (new Date(props.meal.date) - (props.meal.cookTime*60*1000));
  let startTimeHr = new Date(startTimeSec).getHours();
  let startTimeMin = new Date(startTimeSec).getMinutes();
  startTimeHr < 10 ? startTimeHr = '0' + startTimeHr : startTimeHr;
  startTimeMin < 10 ? startTimeMin = '0' + startTimeMin : startTimeMin;
  const startTime = `${startTimeHr}:${startTimeMin}`;

  return (
    <StyledMeal style={{listStyle: 'none'}}>
      <StyledHead>{props.meal.recipeName}</StyledHead>
      <StyledSpan>Meal Time: {mealTime}
      </StyledSpan><br/>
      <StyledSpan>Cook Time: {props.meal.cookTime} min</StyledSpan><br/>
      <StyledSpan style={{color: 'red'}}>Start At: {startTime}
      </StyledSpan><br/>
      <HighlightOffIcon onClick ={() => {
        deleteEntry(props.meal._id, props.updateCalendar, props.meal.userId)
      }

      }/>
    </StyledMeal>
  );
};

const StyledMeal = styled.li`
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 1em;
`;
const StyledSpan = styled.span`
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: .5em;
  font-weight: bold;
`;
const StyledHead = styled.h5`
  text-align: center;
  color: goldenrod;
  margin: 0;
  padding: 0;
`;
export default Meal;