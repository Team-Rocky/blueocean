const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
  '292059641426-88bc4t3ai5nl1k4ik7bluvevs4ce5rj4.apps.googleusercontent.com',
  'XSPG_jD9CYI0D_d_X2SouPPX'
);

oAuth2Client.setCredentials({
  refresh_token:
    '1//04-Y6t4kKwPNZCgYIARAAGAQSNwF-L9IraLQLl4FoeEA_GcawD3vL8dwZV7_g-U96Q-IcRl_2BqlBcyDVRIw7CHjuMT1L6ZK4iVs',
});


const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime() + 2);
const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);
//const colors = calendar.colors().get().execute();
const event = {
  summary: 'New Calendar Event set by Set and Forget',
  description: 'a new calendar event',
  start: {
    dateTime: eventStartTime,
    timeZone: 'America/New_York',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'America/New_York',
  },
  colorId: 1,
};
calendar.events.insert(
  { calendarId: 'primary', resource: event },
  (err) => { if (err) {
    return console.error('Calendar Event Creation Error: ', err);
    return console.log('Calendar Event Created');
  });

/*
//import React, { useState, useCallback } from 'react';
export default Permissions = (props) => {
return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </button>
        {<button
          onClick={() => {
            const emailProvider = new firebase.auth.EmailAuthProvider();
            firebase.auth().signInWithPopup(emailProvider);
          }}
        >
          Sign In with Email
        </button>}
        <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
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
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </FirebaseAuthProvider>
  )
}
export default Permissions;
*/
