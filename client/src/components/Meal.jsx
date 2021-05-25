import React from 'react';
import styled from 'styled-components';

const Meal = (props) => {
  const mealTime = `${new Date(props.meal.date).getHours()}:${new Date(props.meal.date).getMinutes()}`;
  const startTimeSec = (new Date(props.meal.date) - (props.meal.cookTime*60*1000));
  const startTime = `${new Date(startTimeSec).getHours()}:${new Date(startTimeSec).getMinutes()}`;

  return (
    <StyledMeal style={{listStyle: 'none'}}>
      <h5>{props.meal.recipeName}</h5>
      <StyledSpan>Meal Time: {mealTime}
      </StyledSpan><br/>
      <StyledSpan style={{color: 'red'}}>Cook Time: {props.meal.cookTime} min</StyledSpan><br/>
      <StyledSpan>Start At: {startTime}
      </StyledSpan><br/>
    </StyledMeal>
  )
}

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
`;
export default Meal;