const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  avatar_url: String,
  repo_name: {type: String, unique: true},
  repo_url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  var repoArr = JSON.parse(data);

  var filteredRepoArr = [];

  // !!!!!!!!!!!!!  Using promises and .CREATE method  !!!!!!!!!!!

  // for (let i = 0; i < repoArr.length; i++) {
  //   var repoObj = {
  //     username: repoArr[i].owner.login,
  //     avatar_url: repoArr[i].owner.avatar_url,
  //     repo_name: repoArr[i].name,
  //     repo_url: repoArr[i].html_url,
  //     forks: repoArr[i].forks
  //   };
  //   filteredRepoArr.push(Repo.create(repoObj));
  // }

  // Promise.all(filteredRepoArr)
  // .then((data) => {
  //   callback(null, data);
  // })
  // .catch((err) => {
  //   callback(err);
  // });


  // Using "insertMany" method

  for (let i = 0; i < repoArr.length; i++) {
    var repoObj = {
      username: repoArr[i].owner.login,
      avatar_url: repoArr[i].owner.avatar_url,
      repo_name: repoArr[i].name,
      repo_url: repoArr[i].html_url,
      forks: repoArr[i].forks
    };
    filteredRepoArr.push(repoObj);
  }

  Repo.insertMany(filteredRepoArr, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })

}

// Find all repos, sort by descending, and filter by 25
let getRepos = (callback) => {
  console.log('getRepos called!');
  Repo.find({}).sort({ forks: -1 }).limit(25).exec(callback);
}

module.exports = {
  save,
  getRepos
}