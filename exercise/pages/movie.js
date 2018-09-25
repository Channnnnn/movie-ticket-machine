import React, { Component } from 'react';
import MovieEntry from '../components/MovieEntry';
import script from '../script';

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
      this.setState({ 
        movie: snapshot.val() 
      })
    })
  }

  render() {
    return (
      <div>
        <MovieEntry movie={this.state.movie}></MovieEntry>
      </div>
    );
  }
}

export default Movie;
