import React, { useEffect } from 'react';
import Auth from './Auth.jsx';
import firebase from 'firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
const auth = firebase.auth();
import HomePageGrid from './HomePageGrid.jsx';
import axios from 'axios';

const App = (props) => {
  const [user] = useAuthState(auth);
  // To use auth for child components
  // user.displayName = name
  // user.photoURL = profile pic
  // user.email = user email

  useEffect(() => {

    axios.get(`/Girl Fiery`)
      .then((response) => {
        console.log('this is response.data: ', response.data)
      })
      .catch((err) => {
        console.log('error in axios.get: ', err)
      })

  })


  return (
    <div>

      {
        user === null ? 'Sign in to add recipes' :
          <div>
            <img src={user.photoURL} />
            <br />
      Signed in as {user.displayName}
          </div>
      }
      <Auth />
      <HomePageGrid />
    </div>
  );
};

export default App;
