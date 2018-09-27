import React, { Component } from 'react';
import {Link} from '../../routes'
import script from '../../script'

class MovieAction extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    const { showtimes } = this.props
    const { name } = this.props
    const hasShowtimes = script.IsNotUndefined(showtimes) && showtimes.length > 0
    const buttonText = hasShowtimes ? "Buy Ticket": "Coming Soon"
    return ( 
      <div>
        <div name="showtimes" id="showtimes" className="showtimes">
          <h3>Showtimes</h3>
            {
              script.IsNotUndefined(showtimes) && 
                showtimes.map(time => { return <label key={time} value={time}>{time}</label> })             
            }
          </div>
          {
            script.IsNotUndefined(name) &&
            <Link route='movie' params={{id: name}}><a className='ticket'>{buttonText}</a></Link>
          }  
      </div>
     );
  }
}
 
export default MovieAction;