const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      callback(error); // Print the error if one occurred
    } else {
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', JSON.parse(body)); // Print the HTML for the Github homepage.
      callback(null, body);
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;