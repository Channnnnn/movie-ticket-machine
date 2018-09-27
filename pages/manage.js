import React, { Component } from 'react';
import MovieForm from "../components/MovieForm";
import script from "../script";
import Navbar from '../components/Navbar';

class Manage extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: []
    }
    this.GetAllMovie = this.GetAllMovie.bind(this)
  }

  GetAllMovie() {
    script.GetAllMovie().then((movies) => {
      this.setState({movies: movies})
    }).catch((err) => {
      console.error(err.code);
    });
  }

  componentDidMount(){
    this.GetAllMovie();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <span className="counter">{this.state.movies.length} movies</span>
          <MovieForm adder={true} GetAllMovie={this.GetAllMovie}></MovieForm>
          {
            this.state.movies.map((movie) => (
              <MovieForm key={movie.name} movie={movie} GetAllMovie={this.GetAllMovie}></MovieForm>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Manage;
