import React, { PropTypes } from 'react'
import config from '../../config'
import moment from 'moment'
import ProgressMeter from '../progress-meter'
import DeckCover from '../DeckCover'
import './DeckList.scss'

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
        cards={this.props.decks[deckId].cards}/>)
    })

    const hasDecksToShow = deckCovers.length > 0;

    // <h2>How To Use: The Short Version</h2>
    // <ol>
    //   <li>Create a Google spreadsheet and make note of the id. It's the long alphanumeric string between /d/ and /edit/ in the document's URL.</li>
    //   <li>Format the sheet with three columns: tag, question, answer, and use those exact strings as the column headers in cells A1, B1, and C1, respectively.</li>
    //   <li>Make the sheet publicly accessibly by clicking File > Publish to the web...,</li>
    // </ol>

    const overlay = (<div id='DeckList-loading-overlay'>
        <h1 className='loading-text'>Loading flash cards...</h1>
        <div className='spinner'></div>
    </div>);

    let style = {
      WebkitOverflowScrolling: 'touch',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      alignContent: 'stretch',
    }

    return (
      <div className='DeckCovers-container' style={style}>
        {deckCovers}
        {deckCovers.length === 0 ? overlay : null}
      </div>
    )
  }
}
