/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react';
import config from '../../config';
import moment from 'moment';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingQuestion: !!props.isShowingQuestion,
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
    this.props.onFlip();
    this.setState({
      isShowingQuestion: !this.state.isShowingQuestion
    });
  }

  render() {
    return (
      <div style={{fontFamily:'Monospace', margin:10, padding:10, border:'1px dotted gray', backgroundColor: this.state.isShowingQuestion ? '#eee' : 'white'}} onClick={this.flipCard.bind(this)}>
        <h1>{this.state.isShowingQuestion ? "Question" : "Answer"}</h1>
        <p>{this.state.isShowingQuestion ? this.props.question : this.props.answer}</p>

        <div style={{fontSize:10, color:'gray'}}>
          Last seen: {this.props.lastSeen === null ? 'never' : moment().to(this.props.lastSeen)}
          <br/>
          Answered correctly: {this.props.numRightAnswers ? this.props.numRightAnswers : 0} times
          <br/>
          Answered wrongly: {this.props.numWrongAnswers ? this.props.numWrongAnswers : 0} times
        </div>
        <a style={{padding:5}} onClick={this.props.onSkip}>Skip</a>
        <a style={{padding:5}} onClick={this.props.onAnsweredIncorrectly}>Wrong</a>
        <a style={{padding:5}} onClick={this.props.onAnsweredCorrectly}>Right</a>
      </div>
    );
  }
}

// Card.propTypes = { initialCount: React.PropTypes.number };
Card.defaultProps = { lastSeen: null, isShowingQuestion: true, onFlip: function() {} };
