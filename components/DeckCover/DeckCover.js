/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react'
import config from '../../config'
import moment from 'moment'
import ProgressMeter from '../progress-meter'
// import CustomProgressBar from '../CustomProgressBar'

let starStyle = {
  display: 'block',
  position: 'absolute',
  color: 'gold',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '48px'
}
let star = <span style={starStyle} dangerouslySetInnerHTML={{__html: '&#9733;'}}/>


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

    let numRightAnswers = this.props.cardIds.filter((cardId) => { return this.props.cards[cardId].lastAnsweredRight === true }).length
    let numWrongAnswers = this.props.cardIds.filter((cardId) => { return this.props.cards[cardId].lastAnsweredRight === false}).length

    let hasAnsweredAllCorrectly = this.props.cardIds.filter((cardId) => {
      return this.props.cards[cardId].lastAnsweredRight !== true
    }).length === 0

    return (
      <div className="DeckCover" style={{cursor: 'pointer', flexGrow: 1, flexBasis: 'auto', fontFamily:'Monospace', margin:10, position: 'relative'}} onTouchStart={function() {}} onClick={this.props.onClick}>
        {hasAnsweredAllCorrectly ? star : ""}
        <h1 style={{marginTop:0, marginBottom:5}}>{this.props.name}</h1>
        <ProgressMeter style={{marginBottom: 4}} color="green" height={4} complete={numRightAnswers/this.props.cardIds.length}/>
        <ProgressMeter style={{marginBottom: 4}} color="#c00" height={4} complete={numWrongAnswers/this.props.cardIds.length}/>
        <div style={{fontSize:10, color:'gray'}}>
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
