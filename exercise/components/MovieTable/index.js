import React, { Component } from 'react';
import MovieEntry from '../MovieEntry';
import './movieTable.scss'

class MovieTable extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let { movies } = this.props
    return (
      <div className="movieTable">
        <div className="config">
          <div className="sort">
            <select name="sort" id="sort">
              <option value="">Name</option>
            </select></div>
        </div>
        {   
          movies.map((movie) => {
            return <MovieEntry key={movie.name} movie={movie}></MovieEntry>
          })
        }
      </div>
    );
  }
}

export default MovieTable;
