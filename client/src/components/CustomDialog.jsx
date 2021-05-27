import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { Paper } from '@material-ui/core';
import axios from 'axios';

import ScheduleMeal from './ScheduleMeal.jsx';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  item: {
    margin: '5px',
    padding: '5px',
    borderRadius: '0',
    color: 'black',
    fontFamily: 'Architects Daughter',
    fontSize: '150%'

  },

  box: {
    backgroundColor: '#a37748',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/cardboard.png")',
  },

  button: {

  }
});



const DialogTitle = withStyles(styles)((props) => {
  const cl = styles()
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function RecipeItem(props) {
  const cl = styles()
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const postCalendarEntry = (obj) => {

  //   var entry = {
  //     userId: obj.userId,
  //     recipeId: obj._id,
  //     date: new Date() + 3,
  //     cookTime: obj.totalTime,
  //     ingredientList: obj.ingredientLines,
  //     recipeName: obj.name
  //   }
  //   console.log('this is entry: ', entry)
  //   // axios.post(axios.post('/api/recipes/calendar', entry))
  // }

  return (
    <div >
      <Button variant="outlined" fullWidth={true} style={cl.item} onClick={handleClickOpen}>
        {props.recipe.name}
      </Button>
      <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle style={cl.box} id="customized-dialog-title" onClose={handleClose}>
          {props.recipe.name}
        </DialogTitle>
        <img src={props.recipe.photo[0]} />
        <DialogContent style={cl.box} dividers>

          {/* <Typography gutterBottom>
            {props.recipe.ingredientLines.map((line, index) => {
              return (<div key={index}>{line}</div>)
            })}
          </Typography> */}
          <div style={cl.box}>
            {props.recipe.ingredientLines.map((line, index) => {
              return (<div key={index}>{line}</div>)
            })}
          </div>
          <Typography gutterBottom>
            {props.recipe.description}
          </Typography>
          {/* <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions style={cl.box} >
          <ScheduleMeal handleClose={handleClose} recipe={props.recipe} userId={props.userId} updateCalendar={props.updateCalendar}/>
        </DialogActions>
      </Dialog>
    </div>
  );
}