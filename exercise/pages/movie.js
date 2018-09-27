import React, { Component } from 'react';
import MovieEntry from '../components/MovieEntry';
import MovieTicket from '../components/MovieTicket';
import script from '../script';
import Navbar from '../components/Navbar';

class Movie extends Component {
  constructor(props){
    super(props)
    this.state = {
      movie: {}
    }
  }

  componentDidMount(){
    let { query } = this.props.url;
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
        <Navbar />
        <section className="main full-height">
          <div className="ticket center">
            <MovieEntry movie={this.state.movie} darkMode={true}></MovieEntry>
            <MovieTicket movie={this.state.movie}></MovieTicket>
          </div>
        </section>
      </div>
    );
  }
}

export default Movie;
