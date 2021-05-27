import React from 'react';
import Meal from './Meal.jsx';
import styled from 'styled-components';




const Day = (props) => {

  let meals = props.schedule[props.day];
  if (meals !== undefined) {
    meals = meals.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  return (
    <StyledDay className="day">
      <h2 style={{borderBottom: 'solid black'}}>{props.day}</h2>
      {props.schedule[props.day] === undefined
        ? null
        : <StyledList>
        {meals.map((meal, index)=>
        <div key = {index}>
      <Meal updateCalendar={props.updateCalendar} key={index} meal={meal}/>

      </div>
      )}
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
