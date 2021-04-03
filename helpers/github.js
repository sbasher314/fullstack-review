const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.gitTOKEN}` //${config.TOKEN}`
    }
  };
  return axios(options)
    .then(response => response.data)
    .catch(error => {
      if (error.response.data.message === 'Not Found') {
        error.response.data.message = 'User not found';
      }
      return error.response.data;
    });
}

module.exports.getReposByUsername = getReposByUsername;