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
      if (deckId === 'info') {
        // "info" is a special deck that never gets rendered. Used only to
        // hold user configuration information
        return null;
      }

      return (<DeckCover
        key={deckId}
        onClick={this.props.onSelectDeck.bind(this, deckId)}
        name={deckId}
        cards={this.props.decks[deckId].cards}/>)
    })

    const hasDecksToShow = deckCovers.length > 0;

    const overlayStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      background: '#f1f1f1',
    };

    const spinnerStyle = {
    }

    const overlay = (<div id='DeckList-loading-overlayx' style={overlayStyle}>
        <h1 style={{ position: 'absolute', top: '50%', width: '100%', textAlign: 'center', transform: 'translateY(-50%)', fontWeight: 'normal', fontSize: 20, color: '#555' }} className='xloading-text'>Loading flash cards...</h1>
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
        <div id="title">
          <img src="tile.png" style={{maxHeight: '100%'}}/>
          <h1>Super Flash Cards</h1>
        </div>
        <a id="help" href="https://github.com/ahw/superflash.cards/blob/master/README.md">Help and instructions</a>
        {deckCovers}
        {deckCovers.length === 0 ? overlay : null}
      </div>
    )
  }
}
