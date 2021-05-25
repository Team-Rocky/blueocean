import React from 'react';
import Meal from './Meal.jsx';
import styled from 'styled-components';

const Day = (props) => {
  return (
    <StyledDay className="day">
      <h2 style={{borderBottom: 'solid black'}}>{props.day}</h2>
      {props.schedule[props.day] === undefined ?
      null :
      <StyledList>
        {props.schedule[props.day].map((meal, index)=> <Meal key={index} meal={meal}/>)}
      </StyledList>
      }
    </StyledDay>
  )
};

const StyledDay = styled.div`
  border: solid black;
  overflow: hidden;
  background-color: white;
  text-align: left;
  margin: 0;
  padding: 0;
`;
const StyledList = styled.ul`
  text-align: left;
  margin: 0;
  padding: 0;
`;
export default Day;
