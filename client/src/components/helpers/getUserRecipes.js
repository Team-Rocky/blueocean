const axios = require('axios');

const getUserRecipes = (email) => axios.get(`/api/users/${email}`)
  .then((response) => response.data)
  .catch((err) => {
    console.log('error in axios.get: ', err);
  });

export default getUserRecipes;
