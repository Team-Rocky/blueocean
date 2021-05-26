import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [userInfo, setUserInfo] = useState({});
  const [user] = useAuthState(auth);

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <img
              style={{ border: '1px solid white', borderRadius: '15px' }}
              height="30px"
              width="30px"
              src={user.photoURL}
            />
            <button
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              Sign Out
            </button>
          </div>
        )}
        <div>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== 'anonymous'}
          >
            {/* {({ providerId }) => <div>You are authenticated with {providerId}</div>
            } */}
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </FirebaseAuthProvider>
  );
};
export default Auth;
