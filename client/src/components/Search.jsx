import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.input = React.createRef();
    this.button = React.createRef();
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search(e) {
    e.preventDefault();
    this.props.onSearch(this.state.term);
    this.input.current.value = "";
  }

  keyUp(e) {
    if (e.key === "Enter" || e.keycode === 13) {
      this.button.current.click();
    }
  }

  render() {
    return (
      <div>
        <h4>Add more repos!</h4>
        Enter a github username:
        <input ref={this.input} value={this.state.terms} onKeyUp={(e) => this.keyUp(e)} onChange={(e) => this.onChange(e)}/>
        <button ref={this.button} onClick={(e) => this.search(e)}> Add Repos </button>
      </div>
    )
  }
}

export default Search;