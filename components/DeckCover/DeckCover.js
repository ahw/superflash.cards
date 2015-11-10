/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react'
import config from '../../config'
import moment from 'moment'
import ProgressMeter from '../progress-meter'

export default class DeckCover extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let now = Date.now()
    let newestTimestamp = 0
    let oldestTimestamp = Date.now()
    let mostRecentlySeenCard = null
    let leastRecentlySeenCard = null
    let numSeen = this.props.cardIds.filter((cardId) => {
      return !!this.props.cards[cardId].lastSeen
    }).length

    this.props.cardIds.forEach((cardId) => {
      let card = this.props.cards[cardId]
      if (card.lastSeen && card.lastSeen > newestTimestamp) {
        newestTimestamp = card.lastSeen
        mostRecentlySeenCard = card
      }

      if (card.lastSeen && card.lastSeen < oldestTimestamp) {
        oldestTimestamp = card.lastSeen
        leastRecentlySeenCard = card
      }
    })

    // <br/>
    // {numSeen < this.props.cardIds.length ? this.props.cardIds.length - numSeen + ' never seen' : ""}
    let numRightAnswers = this.props.cardIds.filter((cardId) => { return !!this.props.cards[cardId].numRightAnswers }).length
    let numWrongAnswers = this.props.cardIds.filter((cardId) => { return !!this.props.cards[cardId].numWrongAnswers }).length

    return (
      <div className="DeckCover" style={{flexGrow: 1, flexBasis: 'auto', fontFamily:'Monospace', margin:10, padding:10, border:'1px dotted gray'}} onTouchStart={function() {}} onClick={this.props.onClick}>
        <h1 style={{marginTop:0, marginBottom:5}}>{this.props.name}</h1>
        <ProgressMeter style={{marginBottom: 4}} color="green" height={8} complete={numRightAnswers/this.props.cardIds.length}/>
        <ProgressMeter style={{marginBottom: 4}} color="#c00" height={8} complete={numWrongAnswers/this.props.cardIds.length}/>
        <div style={{fontSize:10, color:'gray'}}>
          {this.props.cardIds.filter((cardId) => { return !!this.props.cards[cardId].lastSeen }).length}/{this.props.cardIds.length} seen
          <br/>
          {numRightAnswers}/{this.props.cardIds.length} answered rightly
          <br/>
          {numWrongAnswers}/{this.props.cardIds.length} answered wrongly
          <br/>
          Most recent seen {mostRecentlySeenCard === null ? 'never' : moment().to(mostRecentlySeenCard.lastSeen)}
        </div>
      </div>
    );
  }
}
