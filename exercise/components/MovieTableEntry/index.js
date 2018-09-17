import React, { Component } from 'react';
import './movieTableEntry.scss';
import firebase from '../../firebase';
import 'firebase/storage';

class MovieTableEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageReady: false
    }
  }

  componentDidMount(){
    const {movie} = this.props
    let storage = firebase.storage();
    storage.refFromURL(movie.posterStorage).getDownloadURL().then(url => {
      this.setState({imageReady: true})
      var img = document.getElementById(movie.name)
      img.src = url;
    })
  }

  render() {
    const { movie } = this.props;
    return (
      <div className="movieTableEntry">
        <div className="entry-moviePoster">
          {
            this.state.imageReady &&
              <img id={movie.name} title={movie.name}/>
          }
        </div>
        <div className="entry-details">
          <span className="entry-title">{movie.name}</span>
          <span className="entry-duration">{movie.duration} min</span>
          <span className="entry-synopsis">Synopsis</span>
          <span className="entry-description">
            {movie.description}
          </span>
        </div>
        <div className="entry-action">Actions</div>
      </div>
    );
  }
}

export default MovieTableEntry;
