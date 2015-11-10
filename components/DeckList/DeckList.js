import React, { PropTypes } from 'react'
import config from '../../config'
import moment from 'moment'
import ProgressMeter from '../progress-meter'
import DeckCover from '../DeckCover'

export default class DeckList extends React.Component {
  componentDidMount() {
    if (window.iNoBounce) window.iNoBounce.disable()
  }

  render() {
    let deckCovers = Object.keys(this.props.decks).map(deckId => {
      return (<DeckCover
        key={deckId}
        onClick={this.props.onSelectDeck.bind(this, deckId)}
        name={deckId}
        cards={this.props.cardEntities}
        cardIds={this.props.decks[deckId].cardIds}/>)
    })

    let style = {
      WebkitOverflowScrolling: 'touch',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      alignContent: 'stretch'
    }

    return (
      <div style={style}>
        {deckCovers}
      </div>
    )
  }
}
