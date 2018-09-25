import React, { Component } from 'react';
import MovieForm from "../components/MovieForm";
import firebase from "../firebase";
import script from "../script";

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
        <MovieForm adder={true} GetAllMovie={this.GetAllMovie}></MovieForm>
        {
          this.state.movies.map((movie) => (
            <MovieForm key={movie.name} movie={movie} GetAllMovie={this.GetAllMovie}></MovieForm>
          ))
        }
      </div>
    );
  }
}

export default Manage;
