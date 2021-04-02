import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term = '') {
    if (term.length > 0) {
      console.log(`${term} was searched`);
      $.post('/repos', {username: term}, (response) => {
        console.log(response);
        this.setState({repos: response.repos})
      })
    } else {
      $.get('/repos', response => {
        console.log(response);
        this.setState({repos: response.repos});

      })
      console.log(`You didn't search anything`);
    }
  }

  componentDidMount () {
    this.search();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <hr />
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));