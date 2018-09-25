import React, { Component } from 'react';
import Link from 'next/link'
import './navbar.scss'

class Navbar extends Component {
  constructor(props){
    super(props)
    this.props = props
  }
  render() {
    return (
      <nav>
          <Link href="/">
            <a title="Our API">Home</a>
          </Link>
          <Link href="/about">
            <a title="About">About</a>
          </Link>
          <input type="search" name="movie-search" id="movie-search"/>
          <input type="button" value="Search"/>
      </nav>
    );
  }
}

export default Navbar;
