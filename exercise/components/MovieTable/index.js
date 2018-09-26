import React, { Component } from 'react';
import MovieEntry from '../MovieEntry/index';
import MovieAction from '../MovieEntry/action';
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
            const movieAction = <MovieAction showtimes={movie.showtimes} name={movie.name}></MovieAction>
            return <MovieEntry key={movie.name} movie={movie}>{movieAction}</MovieEntry>
          })
        }
      </div>
    );
  }
}

export default MovieTable;
