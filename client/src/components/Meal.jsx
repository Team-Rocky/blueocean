import React from 'react';
import styled from 'styled-components';

const Meal = (props) => {
  let mealMinutes = new Date(props.meal.date).getMinutes();
  let mealHours = new Date(props.meal.date).getHours();
  mealHours < 10 ? mealHours = '0' + mealHours : mealHours;
  mealMinutes < 10 ? mealMinutes = '0' + mealMinutes : mealMinutes;
  const mealTime = `${mealHours}:${mealMinutes}`;

  const startTimeSec = (new Date(props.meal.date) - (props.meal.cookTime*60*1000));
  const startTime = `${new Date(startTimeSec).getHours()}:${new Date(startTimeSec).getMinutes()}`;

  return (
    <StyledMeal style={{listStyle: 'none'}}>
      <StyledHead>{props.meal.recipeName}</StyledHead>
      <StyledSpan>Meal Time: {mealTime}
      </StyledSpan><br/>
      <StyledSpan>Cook Time: {props.meal.cookTime} min</StyledSpan><br/>
      <StyledSpan style={{color: 'red'}}>Start At: {startTime}
      </StyledSpan><br/>
    </StyledMeal>
  );
};

const StyledMeal = styled.li`
  text-align: left;
  margin: 0;
  padding: 0;
  font-size: 1em;
`;
const StyledSpan = styled.span`
  text-align: left;
  margin: 0;
  padding: 0;
  font-size: .5em;
  font-weight: bold;
`;
const StyledHead = styled.h5`
  text-align: left;
  margin: 0;
  padding: 0;
`;
export default Meal;