const axios = require('axios');

const getUserCalendar = (email) => axios.get(`/api/users/${email}/userInfo`)
  .then((response) => {
    const id = response.data[0]._id;
    return axios.get(`/api/recipes/calendar/${id}`).then((results) => results.data);
  })
  .catch((err) => {
    console.log('error in axios.get: ', err);
  });

export default getUserCalendar;
