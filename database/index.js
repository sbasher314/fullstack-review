const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  repoId: {type: Number, unique: true},
  name: String,
  url: String, //html_url for repo
  username: String, //owner.login
  userUrl: String, //html_url for user account
  forks: Number,
  watchers: Number,
  createdAt: Date,
  updatedAt: Date,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;