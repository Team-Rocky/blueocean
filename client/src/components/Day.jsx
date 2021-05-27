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
      <DayStyle style={{borderBottom: 'solid black'}}>{props.day}</DayStyle>
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


const DayStyle = styled.h2`
  text-align: center;
  color: darkorchid;
`

const StyledDay = styled.div`
  border: 1px solid black;
  overflow: hidden;
  background-color: rgba(255,255,255, 0.97);
  text-align: left;
  margin: 0.1em;
  padding: 0;
  overflow-y: scroll;
`;
const StyledList = styled.ul`
  text-align: center;
  margin: 0;
  padding: 0;
`;
export default Day;
