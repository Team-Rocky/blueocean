import ax from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Button, Modal } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    display: "grid"
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
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ScheduleMeal = (props) => {
  let entry = {
    userId: props.userId,
    recipeId: props.recipe._id,
    cookTime: props.recipe.totalTime,
    recipeName: props.recipe.name,
    ingredientList: props.recipe.ingredientLines,
  };

  const classes = useStyles();
  const [meal, updateMeal] = useState(entry);
  const [date_time, updateDateTime] = useState({ date: '', time: '' });
  const [btn, updateBtn] = useState({ state: true });

  useEffect(() => {
    if (date_time.date && date_time.time) {
      updateBtn({ state: false });
    }}, [date_time]);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.id, e.target.value)
    if (e.target.id === 'date') {
      updateDateTime({
        time: date_time.time,
        date: e.target.value.toString(),
      });
    }
    if (e.target.id === 'time') {
      updateDateTime({
        date: date_time.date,
        time: e.target.value,
      });
    }
  };

  const handleSchedule = (e) => {

    let year = date_time.date.slice(0, 4);
    let month = date_time.date.slice(5, 7);
    month = (Number(month) - 1).toString();
    let day = date_time.date.slice(8);
    let hour = date_time.time.slice(0, 2);
    let minute = date_time.time.slice(3);
    let mealTime = new Date(year, month, day, hour, minute);
    let meal2 = meal;
    meal2.date = mealTime;
    ax.post('/api/recipes/calendar/', meal2)
      .then(() => { props.updateCalendar(props.userId); })
      .then(() => { handleClose(); })
      .catch((err) => { console.error(err); });
  };
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Schedule Meal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <form
            noValidate
            autoComplete="off"
            className={classes.paper}
          >
            <Box display="flex" flexDirection="column" margin="5%">
              <TextField
                required
                id="date"
                label="date"
                type="date"
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
              <TextField
                required
                id="time"
                label="time"
                type="time"
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 600 }}  // 10min steps
                onChange={handleChange}
              />
              <Button
                disabled={btn.state}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSchedule()
                  if (!props.detailPage && !props.searchPage) {
                    props.handleClose()
                  }
                }}
              >
                schedule
              </Button>
            </Box>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ScheduleMeal;
