const checkForCalendarEvents = () => {
  let cnt = 1;
  return () => {
    new Notification(cnt);
    console.log(`pushNotifications polling for the ${cnt} time`);
    cnt++;
  };
};

const pushNotifications = () => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  new Notification('an infinite order of spam, coming right up! ;]');
  const calCheck = checkForCalendarEvents();
  //setInterval(calCheck, 60000);
};

pushNotifications();
