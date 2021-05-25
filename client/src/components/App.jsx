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





const App = (props) => {
  const [user] = useAuthState(auth);
  const [schedule, setSchedule] = useState([{
    day: 'Monday',
    name: 'name',
    ingredientLines: ['rice', 'apples'],
  }]);
  const [week, setWeek] = useState({ })
  // To use auth for child components
  // user.displayName = name
  // user.photoURL = profile pic
  // user.email = user email


  useEffect(() => {


  var weekList = {
    mon: [],
    tue: [],
    wed: [],
    thur: [],
    fri: [],
    sat: [],
    sun: [],
  }

  var weekdays = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat']
    axios.get('/api/recipes/calendar/60a8479474e6921f4fea1189')
    .then((response) => {
      console.log('got calendar entries!: ', response.data)
      // iterate over response.data
      for (var i = 0; i < response.data.length; i ++) {
        // if date is between last sunday and coming saturday
        var weekday = new Date(response.data[i].date).getDay()

        //var weekday = date.getDay()
        //console.log('this isweekday: ', weekdays[weekday])
          // get weekday
          // push to weekList at weekday
          weekList[weekdays[weekday]].push(response.data[i])
      }
      // store weekList in state and pass it down as props
      console.log('weeklist: ', weekList)
      setWeek(weekList)


    })
    .catch((err) => {
      console.log('err getting calendar entries!: ', err)
    })


    if (user !== null) {
      getUserRecipes(user.email).then(data => console.log(data));
    }
  }, [user]);
  return (
    <div>
      <HomePageGrid week={week} schedule={schedule}/>
      <AddToCalendar schedule={schedule}/>
    </div>
  );
};

export default App;


// POST USER'S RECIPE OF CHOICE TO DATABASE

// var fakeEntry = {
//   userId: "60a8479474e6921f4fea1189",
//   recipeId: "60a847d0ee2e091f56d068e9",
//   date: new Date(2021, 5, 28, 19, 30),
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
  //  // GET CALENDAR ENTRIES FOR SPECIFIC USER

// Axios requests:

 // axios.get(`/api/users/GirlFiery@chefslist.com`)

    //   .then((response) => {
    //     console.log('this is response.data: ', response.data)
    //     // var userId = response.data._id
    //   })
    //   .catch((err) => {
    //     console.log('error in axios.get: ', err)
    //   })




