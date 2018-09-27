import React, { Component } from 'react';
import Link from 'next/link'
import {Router} from '../../routes'
import './navbar.scss'

class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      _query: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleInputChange(event){
    this.setState({
      _query: event.target.value
    })
  }

  handleSearchSubmit(){
    let {_query} = this.state
    let QUERY = _query.toUpperCase()
    if (_query.length > 0){
      Router.pushRoute('search', {search: _query})
    }
  }
  handleKeySubmit(event){
    if (event.key === 'Enter'){
      this.handleSearchSubmit()
    }
  }

  render() {
    return (
      <nav>
          <Link href="/">
            <a title="Home">Home</a>
          </Link>
          <input type="search" name="movie-search" id="movie-search" value={this.state._query} placeholder="Enter movie name" onChange={this.handleInputChange} onKeyPress={this.handleKeySubmit.bind(this)}/>
          <input type="button" value="Search" onClick={this.handleSearchSubmit}/>
      </nav>
    );
  }
}

export default Navbar;
