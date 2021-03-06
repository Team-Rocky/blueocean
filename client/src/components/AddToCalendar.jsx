import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Button, Modal, TextField } from '@material-ui/core';
import styled from 'styled-components';

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
    <GroceryList>

      <ListLabel>
        <div>
        <img src="https://img.icons8.com/doodle/50/000000/tomato--v1.png"/>
        GROCERY
        <img src="https://img.icons8.com/fluent/48/000000/group-of-vegetables.png"/>
        </div>
        <List>List</List>
        <CalButton onClick={props.changeDisplay}>Back To Calendar</CalButton>
        </ListLabel>
      <Weekly>
        {days.map((day, index) => (
            <DailyList key={index} style={{listStyle: 'none'}}>
              <Day>{day}</Day>
              <ShoppingList>
                {Object.keys(ingredients[day]).map((item, index)=> <ListSpace key={index}>
                  {item} x{ingredients[day][item].count.toString()}
                </ListSpace>)}
              </ShoppingList>
            </DailyList>
        ))}
      </Weekly>
    </GroceryList >
  );
};

const ShoppingList = styled.ul`
  margin: 1em;
`
const ListSpace = styled.li`
  margin-bottom: 0.3em;
`

const List = styled.div`
  border-radius: 0.5em;
  margin: 0;
  color: white;
  width: 55%;
  text-align: center;
  background-color: #20b2aa;
`


const ListLabel = styled.h2`
  margin: 1em;
  font-family: 'Architects Daughter',cursive;
  font-size: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const GroceryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dbb572;
  background-image: url("https://www.transparenttextures.com/patterns/little-pluses.png");

`
const Day = styled.div`
  text-align: center;
  padding-top: 0.5em;
  background-color: #20b2aa;
  color: wheat;
  font-family: 'Fredoka One';
`

const DailyList = styled.li`
  background-color: antiquewhite;
  border: 1px solid black;
  overflow: scroll;
  margin: 1em;
  height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 0.3em;
  border-style: none;
`

const Weekly = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 25% 25% 25% 25%;
  padding: 0;
  margin: 0;

`
const CalButton = styled.button`
  margin-top: 1em;
  textAlign: 'center';
  alignContent: 'center';
  justify: 'right';
  background-color: thistle;
  color: #fff;
  border: '1px';
  border-radius: 30px;
`

export default AddToCalendar;