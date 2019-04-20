import React, {Component} from 'react';

let style = {
    display: 'block',
    border: '1px solid black',
    backgroundColor: 'white',
    padding: 10,
    textDecoration: 'none',
    color: 'black',
    textTransform: 'uppercase',
    textAlign: 'center'
}

export default class AllCardsButton extends Component {
  render() {
    return <a style={style} onClick={this.props.onClick} href="#">All Decks</a>
  }
}
