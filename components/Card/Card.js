/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react';
import config from '../../config';
import moment from 'moment';
import BlockButton from '../buttons/BlockButton'
import ProgressMeter from '../progress-meter'

let answerColor = '#0678FE'

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

  // <BlockButton theme='wrong' style={{width: '50%'}} onClick={this.props.onAnsweredIncorrectly}>Wrong</BlockButton>
  // <BlockButton theme='right' style={{width: '50%'}} onClick={this.props.onAnsweredCorrectly}>Right</BlockButton>
  // <BlockButton theme='skip' onClick={this.props.onSkip}>Skip</BlockButton>
  // <BlockButton theme='flip' onClick={this.flipCard.bind(this)}>Flip</BlockButton>

  render() {
    return (
      <div style={{cursor: 'pointer', fontFamily:'Monospace', margin:10, padding:10, border:'1px dotted gray', color: this.state.isShowingQuestion ? 'black' : answerColor}} onClick={this.flipCard.bind(this)}>
          <ProgressMeter color="black" height={5} complete={(this.props.cardIndex+1)/this.props.totalCards}/>
          <h1>{this.state.isShowingQuestion ? "Question" : "Answer"}</h1>
          <p>{this.state.isShowingQuestion ? this.props.question : this.props.answer}</p>

          <div style={{fontSize:10, color: this.state.isShowingQuestion ? 'gray' : answerColor}}>
            Last seen: {this.props.lastSeen === null ? 'never' : moment().to(this.props.lastSeen)}
            <br/>
            Answered correctly: {this.props.numRightAnswers ? this.props.numRightAnswers : 0} times
            <br/>
            Answered wrongly: {this.props.numWrongAnswers ? this.props.numWrongAnswers : 0} times
          </div>
      </div>
    );
  }
}

// Card.propTypes = { initialCount: React.PropTypes.number };
Card.defaultProps = { lastSeen: null, isShowingQuestion: true, onFlip: function() {} };
