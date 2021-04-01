const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/repos', function (req, res) {
  let username = req.body.username;
  let json = {
    message: {},
    repos: []
  }
  if (username !== undefined) {
    github.getReposByUsername(username)
      .then(response => {
        db.save(response)
          .then(async docs => {
            //Do we need these on the server for any reason?
            //I guess we can use this to send a msg back to client saying 'x repos inserted'
            json.repos = await db.top25();
            console.log(json);
            res.json(json);
          });
      })
      .catch(async error => {
        json.message = error.message;
        json.repos = await db.top25();
        res.json(json);
      })
  }

});

app.get('/repos', async function (req, res) {
  let json = {
    message: {},
    repos: []
  }
  json.repos = await db.top25();
  res.json(json);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

