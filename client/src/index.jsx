import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    axios.post('/repos', {
      username: term
    })
    .then((response) => {
      console.log(response.data);
      // this.setState({repos: response.data})
      this.getRepos()
    })
    // .then(
    //   this.getRepos()
    // )
    .catch(function (error) {
      console.log(`Error! Unable to POST user repo data. Possibly trying to add duplicate repo.`);
      console.log(error);
    })
    // $.ajax({
    //   type: "POST",
    //   url: '/repos',
    //   data: JSON.stringify({username: term}),
    //   contentType: "application/json",
    //   success: (response) => {
    //     console.log('Successfully POSTED');
    //     this.getRepos();
    //     // this.setState({repos: JSON.parse(response)})
    //   },
    //   error: function(response) {
    //     console.log(`Error! Unable to POST user repo data.`);
    //   },
    // });
  }


  getRepos () {
    axios.get('/repos')
    .then((response) => {
      console.log(response.data);
      this.setState({repos: response.data})
    })
    .catch(function(error) {
      console.log(`Error! Unable to GET user repo data.`);
      console.log(error);
    })

    // $.ajax({
    //   type: "GET",
    //   url: "/repos",
    //   contentType: "application/json",
    //   success: (response) => {
    //     console.log('Successfully FETCHED');
    //     this.setState({repos: JSON.parse(response)})
    //   },
    //   error: function(response) {
    //     console.log(`Error! Unable to GET user repo data.`);
    //   }
    // });
  }


  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} />
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));