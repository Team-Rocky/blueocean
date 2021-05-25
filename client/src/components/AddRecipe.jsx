import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Button, Modal, TextField } from '@material-ui/core';
import styled from 'styled-components'


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
  },
  paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
}));

const AddRecipe = (props) => {

   const [IngredientList, setIngredientList] = useState([{Ingredient: ""}])
   const [RecipeName, setRecipeName] = useState("");
   const [TotalTime, setTotalTime] = useState("");
   const [Directions, setDirections] = useState("");
   const [Yield, setYield] = useState("");
   const [Private, setPrivate] = useState(false);



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
        Ingredients.push(obj.Ingredient)
      }
    })

    result = {
      name: RecipeName,
      private: Private,
      IngredientLines: Ingredients,
      description: Directions,
      totalTime: TotalTime,
      yield: Yield,
      photo: [],
      date_created: Date.now()
    }

    handleClose();
    console.log(result)

    event.preventDefault();
  }

  const handleAddClick = () => {
    setIngredientList([...IngredientList, {Ingredient: ""}])
  }

  const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
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
                <FormStyle  style={modalStyle} className={classes.paper} onSubmit={handleSubmit}>
                  <RecipeStyle>
                  <RecipeLabel>Recipe</RecipeLabel>
                  <TextField  variant="outlined"  id="recipeName" onChange={HandleRecipeName}/>
                  </RecipeStyle>
                <BoxStyle>
                  <Ingredients> Ingredient:
                    {IngredientList.map ((x, i) => {
                      return (
                        <Box display="flex" key={i}>
                          <div>
                          <TextField required name="Ingredient" value={x.Ingredient} onChange={e => handleInputChange(e, i)}/>
                          </div>
                          <div>
                            {IngredientList.length - 1 === i && <button onClick={handleAddClick}>+</button>}
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
                </FormStyle >
            </Modal>
        </div>

  )
}

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RecipeStyle = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Pattaya', sans-serif;
  font-size: 20px;
`

const RecipeLabel = styled.h2`
  padding-right: 1em;
`
const Ingredients = styled.div`
  border: 1px solid black;
  width: 50%;
  padding: 1em;
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
`
const PrepTime = styled.label`
  display: flex;
  width: 300px;
  margin-right: 1em;
  margin-bottom: 1em;
`
const InputDirection = styled.input`
  width: 300px;
  height: 100px;
`

const BoxStyle = styled.div `
  display: flex;
`

const ButtonStyled = styled.button`
  margin-top: 1em;
`
export default AddRecipe;
