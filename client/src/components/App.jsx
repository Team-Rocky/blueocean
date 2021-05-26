import React, { useEffect, useState } from 'react';
import Auth from './Auth.jsx';
import firebase from 'firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import HomePageGrid from './HomePageGrid.jsx';
import axios from 'axios';
const auth = firebase.auth();
import getUserRecipes from './helpers/getUserRecipes.js';
import AddToCalendar from './AddToCalendar.jsx';
require('./NotificationsTest.js')
import ScheduleMeal from './ScheduleMeal.jsx';

const App = (props) => {
  const [user] = useAuthState(auth);
  const [schedule, setSchedule] = useState([{
    day: 'Monday',
    name: 'name',
    ingredientLines: ['rice', 'apples'],
  }]);
  // To use auth for child components
  // user.displayName = name
  // user.photoURL = profile pic
  // user.email = user email
  useEffect(() => {
    if (user !== null) {
      getUserRecipes(user.email).then(data => console.log(data));
    }
  }, [user]);
  return (
    <div>
      <HomePageGrid schedule={schedule}/>
      <AddToCalendar schedule={schedule}/>
      <ScheduleMeal />
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