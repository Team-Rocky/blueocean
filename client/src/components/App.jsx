import React, { useEffect } from 'react';
import Auth from './Auth.jsx';
import firebase from 'firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import HomePageGrid from './HomePageGrid.jsx';
const auth = firebase.auth();
import getUserRecipes from './helpers/getUserRecipes.js';

const App = (props) => {
  const [user] = useAuthState(auth);
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
    <HomePageGrid/>
  </div>
  );
};

export default App;
