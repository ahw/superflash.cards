/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import crypto from 'crypto';
import Card from '../components/Card';

let cards = [{
  question: 'What is the capital of New YorK?',
  answer: 'Albany'
}, {
  question: 'What is teh capital of Washington?',
  answer: 'Olympia'
}, {
  question: 'What is the capital of California?',
  answer: 'Sacramento'
}];

export default class extends Component {

  render() {
    let cardcomponents = cards.map(card => {
      let sha = crypto.createHash('sha1');
      sha.update(card.question + card.answer);
      let id = sha.digest('hex');

      return (<Card id={id} key={id} {...card}/>);
    })

    return (
      <div>
        {cardcomponents}
      </div>
    );
  }

}
