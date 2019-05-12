const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  avatar_url: String,
  repo_name: String,
  repo_url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // console.log(JSON.parse(data));
  var repoArr = JSON.parse(data);
  var promiseArr = [];

  for (let i = 0; i < repoArr.length; i++) {
    var repoObj = {
      username: repoArr[i].owner.login,
      avatar_url: repoArr[i].owner.avatar_url,
      repo_name: repoArr[i].name,
      repo_url: repoArr[i].html_url,
      forks: repoArr[i].forks
    };
    // var newUser = new Repo(repoObj);
    promiseArr.push(Repo.create(repoObj));
  }

  Promise.all(promiseArr)
  .then((data) => {
    callback(null, data);
  })
  .catch((err) => {
    callback(err);
  });

}

let getRepos = (callback) => {
  console.log('getRepos called!');
  Repo.find({}).limit(25).sort({ forks: -1 }).exec(callback);
}

module.exports = {
  save,
  getRepos
}