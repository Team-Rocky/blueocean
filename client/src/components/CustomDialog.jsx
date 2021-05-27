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
    fontFamily: "'Amatic SC', cursive",
    fontSize: '150%'

  },

  box: {
    backgroundColor: 'wheat',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/cardboard.png")',
    fontFamily: "Pattaya",
    color: 'black'

  },

  button: {

  }
});

const DialogTitle = withStyles(styles)((props) => {
  const cl = styles()
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography style={cl.box} variant="h6">{children}</Typography>
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

  return (
    <div>
      <Button variant="outlined" fullWidth={true} style={cl.item} onClick={handleClickOpen}>
        {props.searchPage === true ? 'More Info' : props.recipe.name}
      </Button>
      <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle style={cl.box} id="customized-dialog-title" onClose={handleClose}>
          {props.recipe.name}
        </DialogTitle>
        <img src={props.recipe.photo[0] ? props.recipe.photo[0] : 'https://pbs.twimg.com/media/D-DX-LDXkAEbaML.png'} />
        <DialogContent style={cl.box} dividers>
          <div style={{fontFamily: 'Cambria'}}>
            {props.recipe.ingredientLines.map((line, index) => {
              return (<div style={{fontFamily: 'Helvetica'}} key={index}>{line}</div>)
            })}
          </div>
          <Typography style={{fontFamily: 'Architects Daughter'}} gutterBottom>
            {props.recipe.description}
          </Typography>
        </DialogContent>
        <DialogActions style={cl.box} >
          <ScheduleMeal handleClose={handleClose} recipe={props.recipe} userId={props.userId} updateCalendar={props.updateCalendar}/>
        </DialogActions>
      </Dialog>
    </div>
  );
}