/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import crypto from 'crypto';
import Card from '../components/Card';
import Deck from '../components/Deck';
import Request from 'superagent';
import _ from 'underscore';
import '../store/store.js';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cardsByCategory: {}
    }
  }

  componentDidMount() {
    Request
      // .get('https://docs.google.com/spreadsheets/d/1NsOHF4qDMybMc7pwqFAAyf0mTUtwpCSAn8Jhl_cNQ6c/pub?output=tsv')
      .get('https://spreadsheets.google.com/feeds/list/1NsOHF4qDMybMc7pwqFAAyf0mTUtwpCSAn8Jhl_cNQ6c/od6/public/values?alt=json')
      .end((error, response) => {
        if (error) {
          return console.error(error);
        }

        let cardsByCategory = {};
        let cardsById = {};

        response.body.feed.entry.forEach((entry) => {
          let card = {
            question: entry.gsx$question.$t,
            answer: entry.gsx$answer.$t
          };

          let sha = crypto.createHash('sha1');
          sha.update(card.question + card.answer);
          let id = sha.digest('hex');
          card.id = id;

          try {
            _.extend(card, JSON.parse(window.localStorage.getItem(card.id)));
          } catch(e) {
          }

          // Push to cardsByCategory
          let categories = entry.gsx$tag.$t.split(',').map((tag) => { return tag.trim(); });
          categories.forEach((category) => {
            if (cardsByCategory[category]) {
              cardsByCategory[category].push(card);
            } else {
              cardsByCategory[category] = [card];
            }
          });

          // Push to cardsById
          cardsById[card.id] = card;
        });
        
        this.setState({cardsByCategory});
      });
    console.log('Component has mounted');
  }

  render() {
    let allCardsLink = (<a className="Navigation-link" style={{display:'block', border:'1px solid black', backgroundColor:'white', position:'fixed', top:0, right:0, padding:10}} onClick={() => {this.setState({selectedCategory: null})}} href="#">All Decks</a>);
    if (this.state.selectedCategory) {
      let newestTimestamp = 0;
      let oldestTimestamp = Date.now();
      let leastRecentlySeenCard = null;
      let mostRecentlySeenCard = null;
      let firstNullCard = null;

      let cards = this.state.cardsByCategory[this.state.selectedCategory].map(card => {

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

        return (<Card
          key={card.id}
          onFlip={() => {card.lastSeen = Date.now(); window.localStorage.setItem(card.id, JSON.stringify(card)); this.forceUpdate();}}
          onSeen={() => {card.lastSeen = Date.now(); this.forceUpdate();}}
          onAnsweredCorrectly={() => {}}
          onAnsweredIncorrectly={() => {}}
          {...card} />);
      });

      return (
        <div>
          {allCardsLink}
          {cards}
        </div>
      );

    } else {

      let decks = Object.keys(this.state.cardsByCategory).map(category => {
        console.log(category);
        return (<Deck
          key={category}
          onClick={() => {this.setState({selectedCategory: category})}}
          category={category}
          cards={this.state.cardsByCategory[category]}/>);
      });

      return (
        <div>
          {allCardsLink}
          {decks}
        </div>
      );
    }

  }

}
