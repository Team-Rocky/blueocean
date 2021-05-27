import 'regenerator-runtime/runtime';

const supportAndPermission = async () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('no service worker support');
  } else if (!('PushManager' in window)) {
    throw new Error('no push api support');
  } else {
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
  }
};

const registerServiceWorker = async () => {
  const swReg = await navigator.serviceWorker.register('./service.js');
  return swReg;
};

const pushNotifications = async () => {
  await supportAndPermission();
  const swRegistration = registerServiceWorker();
};

pushNotifications();

/*
  const checkForCalendarEvents = () => {
    let cnt = 1;
    return () => {
      new Notification(cnt);
      console.log(`pushNotifications polling for the ${cnt} time`);
      cnt++;
    };
  };
    //new Notification('an infinite order of spam, coming right up! ;]');
    //const calCheck = checkForCalendarEvents();
    //setInterval(calCheck, 60000);
*/
