import React, { Component } from 'react';
import {Link} from '../../routes';
import './movieEntry.scss';
import script from '../../script';

class MovieEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageReady: false,
      darkMode: false || this.props.darkMode
    }
  }

  fetchPoster(){
    const {movie} = this.props
    if (script.IsNotUndefined(movie.posterStorage)){
      script.FetchPosterURL(movie.posterStorage).then(url => {
        this.setState({imageReady: true})
        var img = document.getElementById("list" + movie.name)
        img.src = url
      }).catch(err => {
        console.error(err.message, movie);
      });
    }
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
    const synopsisClass = this.state.darkMode ? "entry-synopsis dark-mode" : "entry-synopsis"
    const descriptionClass = this.state.darkMode ? "entry-description dark-mode" : "entry-description"
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
          <span className={synopsisClass}>Synopsis</span>
          <span className={descriptionClass}>
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
