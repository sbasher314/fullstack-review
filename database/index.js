const mongoose = require('mongoose');
mongoose.connect(process.env.mongoDB,
  { useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

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

let save = (repos) => {
  let promises = [];
  for (let repo of repos) {
    let newRepo = {
      repoId: repo.id,
      name: repo.name,
      url: repo.html_url,
      username: repo.owner.login,
      userUrl: repo.owner.html_url,
      forks: repo.forks,
      watchers: repo.watchers,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at
    };
    promises.push(
      new Promise(resolve => {
        Repo.findOneAndUpdate({repoId: repo.id}, newRepo, {upsert: true}, (err, doc) => {
          resolve(doc)
        });
      })
    );
  }
  return Promise.all(promises);
}

let top25 = async (sortParam = 'watchers') => {
  return Repo.find().sort({[sortParam]: -1, updatedAt: -1}).limit(25);
}

module.exports.save = save;
module.exports.top25 = top25;