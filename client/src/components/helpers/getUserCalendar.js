const axios = require('axios');

const getUserCalendar = (id) => axios.get(`/api/recipes/calendar/${id}`)
  .then((response) => response.data)
  .catch((err) => {
    console.log('error in axios.get: ', err);
  });

export default getUserCalendar;
