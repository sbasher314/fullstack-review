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
        if (!Array.isArray(response)) {
          throw response;
        }
        db.save(response)
          .then(async docs => {
            //Do we need these on the server for any reason?
            //I guess we can use this to send a msg back to client saying 'x repos inserted'?
            let updated = 0;
            docs.forEach((val) => updated += (val !== null) ? 1 : 0);
            json.message = {text: `${docs.length - updated} new repos imported, ${updated} repos updated`};
            json.repos = await db.top25();
            res.json(json);
          });
      })
      .catch(async error => {
        console.log(error);
        json.message = {
          text: error.message
        };
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

