import React, { Component } from 'react';
import MovieEntry from '../MovieEntry/index';
import MovieAction from '../MovieEntry/action';
import './movieTable.scss'

class MovieTable extends Component {
  constructor(props){
    super(props);
    this.handleSortOption = this.handleSortOption.bind(this)
  }

  handleSortOption(event){
    let { value } = event.target
    this.props.sortFunction(value)
  }

  render() {
    let { movies } = this.props
    return (
      <div className="movieTable">
        <div className="config">
          <div className="sort">
            <select name="sort" id="sort" onChange={this.handleSortOption}>
              <option value="key">Name</option>
              <option value="price">Price</option>
              <option value="next">Coming Up</option>
            </select></div>
        </div>
        {   
          movies.map((movie) => {
            const movieAction = <MovieAction showtimes={movie.showtimes} name={movie.name}></MovieAction>
            return <MovieEntry key={movie.name} movie={movie}>{movieAction}</MovieEntry>
          })
        }
        {this.props.children}
      </div>
    );
  }
}

export default MovieTable;
