/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import config from '../../config';
import moment from 'moment';

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let newestTimestamp = 0;
    let oldestTimestamp = Date.now();
    let mostRecentlySeenCard = null;
    let leastRecentlySeenCard = null;
    let firstNullCard = null;

    this.props.cards.forEach((card) => {
      if (card.lastSeen && card.lastSeen > newestTimestamp) {
        newestTimestamp = card.lastSeen;
        mostRecentlySeenCard = card;
      }

      if (card.lastSeen && card.lastSeen < oldestTimestamp) {
        oldestTimestamp = card.lastSeen;
        leastRecentlySeenCard = card;
      }

      if (card.lastSeen === null && firstNullCard === null) {
        firstNullCard = card;
      }
    });

    return (
      <div style={{fontFamily:'Monospace', margin:10, padding:10, border:'1px dotted gray'}} onTouchStart={function() {}} onClick={this.props.onClick}>
        <h1 style={{marginTop:0}}>{this.props.category}</h1>
        <div style={{fontSize:10, color:'gray'}}>
          {this.props.cards.filter((card) => { return !!card.lastSeen; }).length}/{this.props.cards.length} seen
          <br/>
          {this.props.cards.filter((card) => { return !!card.lastAnsweredCorrectly;}).length}/{this.props.cards.length} answered correctly
          <br/>
          Most recent seen {mostRecentlySeenCard === null ? 'never' : moment().to(mostRecentlySeenCard.lastSeen)}
          <br/>
          Oldest seen {leastRecentlySeenCard === null ? 'never' : moment().to(leastRecentlySeenCard.lastSeen)}
        </div>
      </div>
    );
  }
}

// Card.propTypes = { initialCount: React.PropTypes.number };
