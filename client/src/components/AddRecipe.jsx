import React, { useState } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Button, Modal, TextField } from '@material-ui/core';
import styled from 'styled-components'
import SubmittedForm from './SubmittedForm.jsx'
const axios = require('axios');
const auth = firebase.auth();


  function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles(theme => ({
  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#a37748',
  },
  paper: {
      position: 'absolute',
      width: 600,
      'background-color':' #a37748',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
}));

const AddRecipe = (props) => {

   const [user] = useAuthState(auth);
   const [IngredientList, setIngredientList] = useState([{Ingredient: ""}])
   const [RecipeName, setRecipeName] = useState("");
   const [TotalTime, setTotalTime] = useState("");
   const [Directions, setDirections] = useState("");
   const [Yield, setYield] = useState("");
   const [Private, setPrivate] = useState(false);
   const [Submitted, setSubmitted] = useState(false);


   const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...IngredientList];
    list[index][name] = value;
    setIngredientList(list);
  };

  const HandleTimeChange = (e) => {
    setTotalTime(e.target.value)
  }

  const HandleRecipeName = (e) => {
    setRecipeName(e.target.value);
  }

  const handleDirection = (e) => {
    setDirections(e.target.value);
  }

  const handleYield = (e) => {
    setYield(e.target.value)
  }

  const handlePrivate = (e) => {
    setYield(e.target.value)
  }


  const handleSubmit = (event) => {
    var result = {}
    var Ingredients = [];
    IngredientList.forEach(obj => {
      if (obj.Ingredient !== "") {
        Ingredients.push(obj.Ingredient);
      }
    });

    result = {
      userId: props.userId,
      userName: user.displayName,
      name: RecipeName,
      private: Private,
      ingredientLines: Ingredients,
      description: Directions,
      popularity: 0,
      totalTime: Number(TotalTime),
      yield: Number(Yield),
      photo: [],
      date_created: Date.now(),
    };

    axios.post('/api/recipes', result)
      .then(() => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error)
      })


    event.preventDefault();
  }

  const handleAddClick = () => {
    setIngredientList([...IngredientList, {Ingredient: ""}])
  }

  const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setSubmitted(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIngredientList([{Ingredient: ""}])
        setDirections("")
        setRecipeName("")

    };

  return (
    <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Create Recipes
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
            >
              {Submitted ? <FormStyle  style={modalStyle} className={classes.paper} onSubmit={handleSubmit}>
                <Exit onClick={handleClose}>+</Exit>
                <SubmittedForm/>
                </FormStyle>:
                <FormStyle autoComplete="off" style={modalStyle} className={classes.paper} onSubmit={() => {
                  handleSubmit()
                  props.getBoard()
                }}>
                  <Exit onClick={handleClose}>+</Exit>
                  <RecipeStyle>
                  <RecipeLabel>Recipe</RecipeLabel>
                  <TextField  variant="outlined"  id="recipeName" onChange={HandleRecipeName}/>
                  </RecipeStyle>
                <BoxStyle>
                  <Ingredients>
                  <IngredientLabel>
                    <Ingredientpic src="https://img.icons8.com/wired/60/000000/ingredients.png"/>
                    Ingredients:
                  </IngredientLabel>
                    {IngredientList.map ((x, i) => {
                      return (
                        <Box display="flex" alignItems="flex-end" key={i}>
                          <div>
                          <TextField name="Ingredient" value={x.Ingredient} onChange={e => handleInputChange(e, i)}/>
                          </div>
                          <div>
                            {IngredientList.length - 1 === i && <AddButton onClick={handleAddClick}>+</AddButton>}
                          </div>
                        </Box>
                      )
                    })}
                  </Ingredients>

                  <Preparation>
                    <PrepTime>
                      Total Time:
                      <InputStyle required onChange={HandleTimeChange} id="prep-time"/>
                      Yield:
                      <InputStyle onChange={handleYield}/>
                      Private:
                      <input  type="checkbox" onChange={handleOpen}></input>
                    </PrepTime>

                    <label>
                      directions:
                      <InputDirection required onChange={handleDirection} id="directions"/>
                      </label>
                  </Preparation>
                </BoxStyle>
                    <ButtonStyled type="submit">Submit</ButtonStyled>
                </FormStyle > }

            </Modal>
        </div>

  )
}

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #a37748;
  background-image: url("https://www.transparenttextures.com/patterns/cardboard.png");
  margin-top
`
const IngredientLabel = styled.div`
  display: flex;
  font-family: 'Amatic SC', cursive;
  font-size: 20px;
  background-color: #a37748;
  background-image: url("https://www.transparenttextures.com/patterns/cardboard.png");
`

const Exit = styled.div`
  align-self: flex-end;
  margin: 0;
  padding: 0;
  transform: rotate(45deg);
  cursor: pointer;
  background-color: #a37748;
  background-image: url("https://www.transparenttextures.com/patterns/cardboard.png");
`

const Ingredientpic = styled.img`
  margin-right: 0.5em;
  width: 30px;
`

const RecipeStyle = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Pattaya', sans-serif;
  font-size: 20px;
  align-items: center;
  background-color: #a37748;
  background-image: url("https://www.transparenttextures.com/patterns/cardboard.png");
`

const RecipeLabel = styled.h2`
  padding-right: 1em;
  background-color: #a37748;
  background-image: url("https://www.transparenttextures.com/patterns/cardboard.png");
`
const Ingredients = styled.div`
  border: 1px solid black;
  width: 50%;
  padding: 1em;
  background-color: #a37748;
  background-image: url("https://www.transparenttextures.com/patterns/cardboard.png");
`

const InputStyle = styled.input`
  margin-left: 1em;
  margin-right: 0.5em;
  width: 4em;
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
`

const Preparation = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 50%;
  padding-bottom: 0px;
  font-family: 'Amatic SC', cursive;
  background-color: #a37748;
  background-image: url("https://www.transparenttextures.com/patterns/cardboard.png");
`
const PrepTime = styled.label`
  display: flex;
  width: 300px;
  margin-right: 1em;
  margin-bottom: 1em;
  background-color: #a37748;
  background-image: url("https://www.transparenttextures.com/patterns/cardboard.png");
`
const InputDirection = styled.input`
  width: 300px;
  height: 100px;
  background-color: #a37748;
  background-image: url("https://www.transparenttextures.com/patterns/cardboard.png");
  border: 1px solid black;
`

const BoxStyle = styled.div `
  display: flex;
  background-color: #a37748;
  background-image: url("https://www.transparenttextures.com/patterns/cardboard.png");
`

const AddButton = styled.button`
  margin-left: 0.5em;
`

const ButtonStyled = styled.button`
  margin-top: 1em;
`
export default AddRecipe;
