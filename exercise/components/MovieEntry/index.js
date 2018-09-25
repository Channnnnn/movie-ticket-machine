import React, { Component } from 'react';
import Link from 'next/link';
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
          <span className="entry-duration">{movie.duration} min</span>
          <span className="entry-synopsis">Synopsis</span>
          <span className="entry-description">
            {movie.description}
          </span>
        </div>
        <div className="entry-action">
          <select name="showtimes" id="showtimes">
            {
              script.IsNotUndefined(movie.showtimes) && 
                movie.showtimes.map(time => { return <option key={time} value={time}>{time}</option> })             
            }
          </select>
          <Link href="#"><button className='ticket'>Buy Ticket</button></Link>
        </div>
      </div>
    );
  }
}

export default MovieEntry;
