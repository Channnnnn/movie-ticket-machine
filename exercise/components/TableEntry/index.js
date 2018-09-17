import React, { Component } from 'react';
import './tableEntry.scss';

class TableEntry extends Component {
  render() {
    return (
      <div className="tableEntry">
        <div className="entry-moviePoster">
          <img src="" title="movie-name"/>
        </div>
        <div className="entry-details">
          <span className="entry-title">Deadpool 2</span>
          <span className="entry-description">
            After surviving a near fatal bovine attack, a disfigured cafeteria chef (Wade Wilson) struggles to fulfill his dream of becoming Mayberry's hottest bartender while also learning to cope with his lost sense of taste.
          </span>
        </div>
        <div className="entry-action">Actions</div>
      </div>
    );
  }
}

export default TableEntry;
