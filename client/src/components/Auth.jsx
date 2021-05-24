import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
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
        {user === null ? (
          <button
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider);
            }}
          >
            Sign In with Google
          </button>
        ) : (
          /* <button
          onClick={() => {
            const emailProvider = new firebase.auth.EmailAuthProvider();
            firebase.auth().signInWithPopup(emailProvider);
          }}
        >
          Sign In with Email
        </button> */
          <button
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Sign Out
          </button>
        )}
        <div>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== 'anonymous'}
          >
            {({ providerId }) => (
              <div>You are authenticated with {providerId}</div>
            )}
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </FirebaseAuthProvider>
  );
};
export default Auth;
