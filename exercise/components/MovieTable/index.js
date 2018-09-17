import React, { Component } from 'react';
import MovieTableEntry from '../MovieTableEntry';
import './movieTable.scss'

class MovieTable extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let { movies } = this.props
    
    return (
      <div className="movieTable">
        {   
          movies.map((movie) => {
            return <MovieTableEntry key={movie.name} movie={movie}></MovieTableEntry>
          })
        }
      </div>
    );
  }
}

export default MovieTable;
