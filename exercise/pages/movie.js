import React, { Component } from 'react';
import MovieEntry from '../components/MovieEntry';
import MovieTicket from '../components/MovieTicket';
import script from '../script';
import Modal from '../components/Modal';

class Movie extends Component {
  constructor(props){
    super(props)
    this.state = {
      movie: {}
    }
  }

  componentDidMount(){
    let { query } = this.props.url;
    console.log(query.id);
    script.GetMovieDB(query.id).once('value', snapshot => {
      let movie = snapshot.val()
      movie.name = query.id
      this.setState({ 
        movie: movie 
      })
    })
  }

  render() {
    return (
      <div>
          <MovieEntry movie={this.state.movie}></MovieEntry>
          <MovieTicket movie={this.state.movie}></MovieTicket>
      </div>
    );
  }
}

export default Movie;
