/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import config from '../../config';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowingQuestion: props.isShowingQuestion,
      lastSeen: props.lastSeen
    };
  }

  showAnswer() {
    this.setState({
      isShowingQuestion: false
    });
  }

  showQuestion() {
    this.setState({
      isShowingQuestion: true
    });
  }

  flipCard() {
    this.setState({
      isShowingQuestion: !this.state.isShowingQuestion
    });
  }

  render() {
    return (
      <div onClick={this.flipCard.bind(this)}>
        <h1>{this.state.isShowingQuestion ? "Question" : "Answer"}</h1>
        <p>{this.state.isShowingQuestion ? this.props.question : this.props.answer}</p>
        <i>Last seen: {this.state.lastSeen === null ? 'never' : this.state.lastSeen}</i>
        <i>{this.id}</i>
      </div>
    );
  }
}

// Card.propTypes = { initialCount: React.PropTypes.number };
Card.defaultProps = { lastSeen: null, isShowingQuestion: true };
