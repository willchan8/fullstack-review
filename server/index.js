const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helpers.getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      res.status(500).send();
    } else {
      db.save(data, (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          res.status(201).send(result);
        }
      });
    }
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getRepos((err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send(result);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

