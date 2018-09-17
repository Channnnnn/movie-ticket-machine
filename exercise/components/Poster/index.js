import React, { Component } from 'react';
import Link from 'next/link'
import './poster.scss'

class Poster extends Component {
  render() {
    const { name } = this.props.movie;
    const { duration } = this.props.movie;
    return (
      <Link href="#">
        <a className="card rounded">
          <div title="movie_name" className="poster">
            <img src="" alt="movie_name"/>
          </div>
          <div className="poster-card-title">{name}</div>
          <div className="poster-card-subtitle">({duration} min)</div>
        </a>
      </Link>
    );
  }
}
const title = { fontSize: '1em', color: 'lightgrey'}
const subTitle = { fontSize: '.75em', color: 'darkgrey'}

export default Poster;
