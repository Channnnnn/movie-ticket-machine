import React, { Component } from 'react';
import {Link} from '../../routes'
import './poster.scss'
import script from '../../script.js'

class Poster extends Component {
  constructor(props){
    super(props);
    this.state = {
      imageReady: false
    }
  }

  componentDidMount(){
    const {movie} = this.props;
    script.FetchPosterURL(movie.posterStorage).then(url => {
      this.setState({imageReady: true})
      var img = document.getElementById("poster" + movie.name)
      img.src = url
    });
  }

  render() {
    const { name } = this.props.movie;
    const { duration } = this.props.movie;
    return (
      <Link route='movie' params={{id: name}}>
        <a className="card rounded poster">
          <div title="movie_name" className="poster">
            { 
              this.state.imageReady &&
                <img id={"poster" + name} src="" title={name}/>
            }
          </div>
          <div className="vertical-middle">
            <div className="poster-card-title">{name}</div>
            <div className="poster-card-subtitle">({duration} min)</div>
          </div>
        </a>
      </Link>
    );
  }
}
const title = { fontSize: '1em', color: 'lightgrey'}
const subTitle = { fontSize: '.75em', color: 'darkgrey'}

export default Poster;
