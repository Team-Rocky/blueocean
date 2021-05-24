import React, { useEffect, useState } from 'react';
import Auth from './Auth.jsx';
import firebase from 'firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import HomePageGrid from './HomePageGrid.jsx';
const auth = firebase.auth();
import getUserRecipes from './helpers/getUserRecipes.js';


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
    </div>
  );
};

export default App;
