import React, { Component } from 'react';
import {Link} from '../../routes';
import './movieEntry.scss';
import script from '../../script';

class MovieEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageReady: false
    }
  }

  fetchPoster(){
    const {movie} = this.props
      script.FetchPosterURL(movie.posterStorage).then(url => {
        this.setState({imageReady: true})
        var img = document.getElementById("list" + movie.name)
        img.src = url
      }).catch(err => {
        console.error(err.message, movie);
      });
  }

  componentDidMount(){
    this.fetchPoster();
  }

  componentDidUpdate(){
    if (!this.state.imageReady){
      this.fetchPoster();
    }
  }

  render() {
    const { movie } = this.props;
    return (
      <div className="movieEntry">
        <div className="entry-moviePoster">
          {
            this.state.imageReady &&
              <img id={"list" + movie.name} title={movie.name}/>
          }
        </div>
        <div className="entry-details">
            <span className="entry-title">{movie.name}</span>
          <div>
            <span className="entry-duration">{movie.duration} min</span>
            <span className="entry-price">{movie.price} THB</span>
          </div>
          <span className="entry-synopsis">Synopsis</span>
          <span className="entry-description">
            {movie.description}
          </span>
        </div>
        <div className="entry-action">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MovieEntry;
