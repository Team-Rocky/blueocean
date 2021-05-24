<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useCallback } from 'react';
import config from "../../../config.js";
import firebase from 'firebase';
import "firebase/auth";
=======
import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
>>>>>>> main
=======
import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
>>>>>>> main
import 'firebase/firestore';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
<<<<<<< HEAD
<<<<<<< HEAD
} from "@react-firebase/auth";
firebase.initializeApp(config);
var db = firebase.firestore();

const Auth = (props) => {
return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <button
=======
=======
>>>>>>> main
} from '@react-firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import config from '../../../config.js';
firebase.initializeApp(config);
const auth = firebase.auth();

const Auth = () => {
  const [user] = useAuthState(auth);
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        {user === null ? <button
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </button>
<<<<<<< HEAD
<<<<<<< HEAD
        {/* <button
=======
        /* <button
>>>>>>> main
=======
        /* <button
>>>>>>> main
          onClick={() => {
            const emailProvider = new firebase.auth.EmailAuthProvider();
            firebase.auth().signInWithPopup(emailProvider);
          }}
        >
          Sign In with Email
<<<<<<< HEAD
<<<<<<< HEAD
        </button> */}
        <button
=======
        </button> */
          : <button
>>>>>>> main
=======
        </button> */
          : <button
>>>>>>> main
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
<<<<<<< HEAD
<<<<<<< HEAD
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            if (isSignedIn === true) {
            }
          }}
        </FirebaseAuthConsumer>
        <div>
          <IfFirebaseAuthed>
            {() => {
              return <div>You are authenticated</div>;
            }}
          </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }}
=======
=======
>>>>>>> main
        }
        <div>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== 'anonymous'}
          >
            {({ providerId }) => <div>You are authenticated with {providerId}</div>
            }
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </FirebaseAuthProvider>
<<<<<<< HEAD
<<<<<<< HEAD
  )
}
export default Auth;

=======
  );
};
export default Auth;
>>>>>>> main
=======
  );
};
export default Auth;
>>>>>>> main
