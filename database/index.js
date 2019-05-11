const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  repo_name: String,
  repo_url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  console.log(JSON.parse(data));
  var repoArr = JSON.parse(data);

  for (let i = 0; i < repoArr.length; i++) {
    var repoObj = {
      username: repoArr[i].owner.login,
      repo_name: repoArr[i].name,
      repo_url: repoArr[i].html_url,
      forks: repoArr[i].forks
    };
    var newUser = new Repo(repoObj);
    Repo.create(repoObj, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  }
}

module.exports.save = save;