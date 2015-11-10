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
import CardMetadata from '../CardMetadata'
import CardHelpDirections from '../CardHelpDirections'

let answerColor = 'rgb(0, 62, 136)' // #0678FE'

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

  onKeyDown(e) {
    console.log('Got keydown', e)
    if (e.keyIdentifier === 'Up') this.props.onBackToAllDecks()
    else if (e.keyIdentifier === 'Left') this.props.onAnsweredIncorrectly()
    else if (e.keyIdentifier === 'Right') this.props.onAnsweredCorrectly()
    else if (e.keyIdentifier === 'Down') this.props.onSkip()
    else if (e.keyCode === 32) this.flipCard() // SPACE
    else this.flipCard()
  }

  // <BlockButton theme='wrong' style={{width: '50%'}} onClick={this.props.onAnsweredIncorrectly}>Wrong</BlockButton>
  // <BlockButton theme='right' style={{width: '50%'}} onClick={this.props.onAnsweredCorrectly}>Right</BlockButton>
  // <BlockButton theme='skip' onClick={this.props.onSkip}>Skip</BlockButton>
  // <BlockButton theme='flip' onClick={this.flipCard.bind(this)}>Flip</BlockButton>

  componentDidMount() {
    if (window.iNoBounce) window.iNoBounce.enable()
    this._keyDownListener = this.onKeyDown.bind(this)
    document.addEventListener('keydown', this._keyDownListener)
  }

  componentWillUnmount() {
    console.log('Card will unmount')
    document.removeEventListener('keydown', this._keyDownListener)
  }

  render() {
    let style = {
      cursor: 'pointer',
      fontFamily:'Monospace',
      margin: 0,
      padding: 10,
      // paddingTop: 20,
      // background: this.state.isShowingQuestion ? 'white' : '#DDF5FF',
      // height: screen.height,
      height: window.document.documentElement.clientHeight - 20, // to account for padding
      color: this.state.isShowingQuestion ? 'black' : answerColor
    }

    // <CardHelpDirections />
    let text = this.state.isShowingQuestion ? this.props.question : this.props.answer
    let dangerousHtml = {__html: text.replace(/\s\s/g, '<br/><br/>')}

    return (
      <div style={style} onClick={this.flipCard.bind(this)}>
          <ProgressMeter color={this.state.isShowingQuestion ? 'black' : answerColor} height={5} complete={(this.props.cardIndex+1)/this.props.totalCards}/>
          <h1>{this.state.isShowingQuestion ? "Question" : "Answer"}</h1>
          <p dangerouslySetInnerHTML={dangerousHtml} style={{position: 'absolute', top: '35%', transform: 'translateY(-50%)', width: '80%', left: '10%'}}/>

          <CardMetadata style={{/*color: this.state.isShowingQuestion ? 'gray' : answerColor*/}} {...this.props} />
      </div>
    );
  }
}

// Card.propTypes = { initialCount: React.PropTypes.number };
Card.defaultProps = { lastSeen: null, isShowingQuestion: true, onFlip: function() {} };
