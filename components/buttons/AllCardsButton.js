import React, {Component} from 'react';

let style = {
    display: 'block',
    border: '1px solid black',
    backgroundColor: 'white',
    position: 'fixed',
    top: 0,
    right: 0,
    padding: 10,
    textDecoration: 'none',
    color: 'black',
    textTransform: 'uppercase'
}

export default class AllCardsButton extends Component {
  render() {
    return <a style={style} onClick={this.props.onClick} href="#">All Decks</a>
  }
}
