import React, { useEffect, useState } from 'react';
import Auth from './Auth.jsx';
import firebase from 'firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
const auth = firebase.auth();

import HomePageGrid from './HomePageGrid.jsx';
import RecipeDetailsGrid from './RecipeDetailsGrid.jsx';
import RecipeSearchGrid from './RecipeSearchGrid.jsx';
import HomePageGrid from './HomePageGrid.jsx';
import axios from 'axios';
const auth = firebase.auth();
import getUserCalendar from './helpers/getUserCalendar.js';
import AddToCalendar from './AddToCalendar.jsx';





const App = (props) => {
  const [user] = useAuthState(auth);
  const [schedule, setSchedule] = useState([]);
  const [display, setDisplay] = useState('home');
  const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursay',
    5: 'Friday',
    6: 'Saturday',
  };
  const [week, setWeek] = useState({})
  // To use auth for child components
  // user.displayName = name
  // user.photoURL = profile pic
  // user.email = user email


  useEffect(() => {


    var weekList = {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: []
    }

    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    axios.get('/api/recipes/calendar/60a8479474e6921f4fea1189')
      .then((response) => {
        console.log('got response; ', response.data)
        for (var i = 0; i < response.data.length; i++) {
          var weekday = new Date(response.data[i].date).getDay()
          weekList[weekdays[weekday]].push(response.data[i])
        }
        setWeek(weekList)


      })
      .catch((err) => {
        console.log('err getting calendar entries!: ', err)
      })


    if (user !== null) {
<<<<<<< HEAD
      getUserRecipes(user.email).then((data) => console.log(data));
=======
      getUserCalendar('JackPeepin@chefslist.com').then(data => {
        const mappedToDay = {
          Sunday: [],
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
        };
        data.forEach((meal) => {
          const date = new Date(meal.date).getDay();
          const day = days[date];
          mappedToDay[day].push(meal);
        });
        setSchedule(mappedToDay);
      });
>>>>>>> main
    }
  }, [user]);
  const changeDisplay = () => {
    display === 'home' ? setDisplay('list') : setDisplay('home');
  };
  return (
    <div>
<<<<<<< HEAD
      <HomePageGrid schedule={schedule} />
      <AddToCalendar schedule={schedule} />
=======
      {display === 'home' ?
      <div>
        <button onClick={changeDisplay}>Shopping List</button>
        <HomePageGrid week={week} schedule={schedule}/>
      </div>
        : null}
      {display === 'list' ?
      <div>
        <button onClick={changeDisplay}>Calendar</button>
        <AddToCalendar schedule={schedule}/>
      </div>
        : null}
>>>>>>> main
    </div>
  );
};

export default App;




// Axios requests:

// axios.get(`/api/users/GirlFiery@chefslist.com`)

//   .then((response) => {
//     console.log('this is response.data: ', response.data)
//     // var userId = response.data._id
//   })
//   .catch((err) => {
//     console.log('error in axios.get: ', err)
//   })

// GET CALENDAR ENTRIES FOR SPECIFIC USER
// axios.get('/api/recipes/calendar/60a828914c20a51c8065bb49')
// .then((response) => {
//   console.log('got calendar entries!: ', response.data)
// })
// .catch((err) => {
//   console.log('err getting calendar entries!: ', err)
// })

<<<<<<< HEAD
// POST USER'S RECIPE OF CHOICE TO DATABASE
// var fakeEntry = {
//   userId: "60a828914c20a51c8065bb49",
//   recipeId: "60a8289ee9432a1c8262eead",
//   date: new Date(),
//   cookTime: 45,
//   ingredientsList: [
//     "2 pounds skin-on, boneless chicken thighs",
//     "1 cup thinly sliced red onion",
//     "2 tablespoons minced garlic",
//     "2 tablespoons minced peeled ginger",
//     "1/4 cup soy sauce",
//     "1/4 cup fresh tangerine or orange juice",
//     "Freshly ground pepper",
//     "Vegetable oil, for the grill"
//   ],
//   recipeName: "Dirty P's Garlic-Ginger Chicken Thighs"
// }

// axios.post('/api/recipes/calendar', fakeEntry)
//   .then((response) => {
//     console.log('posted calendar entry!')
//   })
//   .catch((err) => {
//     console.log('err in axios post calendar entry:', err)
//   })
=======
    // POST USER'S RECIPE OF CHOICE TO DATABASE
    // var fakeEntry = {
    //   userId: "60a828914c20a51c8065bb49",
    //   recipeId: "60a8289ee9432a1c8262eead",
    //   date: new Date(),
    //   cookTime: 45,
    //   ingredientList: [
    //     "2 pounds skin-on, boneless chicken thighs",
    //     "1 cup thinly sliced red onion",
    //     "2 tablespoons minced garlic",
    //     "2 tablespoons minced peeled ginger",
    //     "1/4 cup soy sauce",
    //     "1/4 cup fresh tangerine or orange juice",
    //     "Freshly ground pepper",
    //     "Vegetable oil, for the grill"
    //   ],
    //   recipeName: "Dirty P's Garlic-Ginger Chicken Thighs"
    // }

    // axios.post('/api/recipes/calendar', fakeEntry)
    //   .then((response) => {
    //     console.log('posted calendar entry!')
    //   })
    //   .catch((err) => {
    //     console.log('err in axios post calendar entry:', err)
    //   })
>>>>>>> main
