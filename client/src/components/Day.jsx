import React from 'react';
import Meal from './Meal.jsx';
import styled from 'styled-components';

const Day = (props) => {
  const meals = props.schedule.filter(item => item.day === props.day);
  return (
    <StyledDay className="day">
      <h2 style={{borderBottom: 'solid black'}}>{props.day}</h2>
      <ul>
        {meals.map((meal, index)=> <Meal key={index} meal={meal}/>)}
      </ul>
    </StyledDay>
  )
};

const StyledDay = styled.div`
  border: solid black;
  overflow: hidden;
  background-color: white;
`;
export default Day;
