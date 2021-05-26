const checkForCalendarEvents = () => {
  let cnt = 1;
  return () => {
    new Notification(cnt);
    console.log(cnt);
    cnt++;
  };
};

const NotificationsTest = () => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  } else {
    new Notification('an infinite order of spam, coming right up! :]');
  }
  const calCheck = checkForCalendarEvents();
  //setInterval(calCheck, 5000);
};
NotificationsTest();

export default NotificationsTest;
//import NotificationsTest from './NotificationsTest.js';