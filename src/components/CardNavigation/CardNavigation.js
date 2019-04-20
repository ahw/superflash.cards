import React, { PropTypes } from 'react'
import './CardNavigation.scss'

export default class CardNavigation extends React.Component {
  render() {
    let items = this.props.cards.map((card, i) => {
      let style = {opacity:0.3}
      if (card.lastAnsweredRight) {
        style.background = 'green'
      } else if (card.lastAnsweredRight === false) {
        style.background = '#c00'
      } else {
        style.background = '#d3d3d3'
      }

      if (this.props.currentCardIndex === i) {
        style.opacity = 1
      }

      return <div style={style} key={card.id}/>
    })

    return <div id="card-navigation">{items}</div>
  }
}
