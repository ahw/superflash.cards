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
// import './Card.scss';
// import CustomProgressBar from '../CustomProgressBar'

let answerColor = 'rgb(0, 62, 136)' // #0678FE'
let clientWidth = window.document.documentElement.clientWidth
function linearTransform(domain, range, x) {
  // rise / run
  let slope = (range[1] - range[0]) / (domain[1] - domain[0])
  // b = y - mx
  var intercept = range[0] - slope * domain[0];
  if (typeof x === "number") {
      // If a domain value was provided, return the transformed result
      return slope * x + intercept;
  } else {
      // If no domain value was provided, return a function
      return (x) => { return slope * x + intercept }
  }
}

let getLightness = linearTransform([0, 1], [100, 25])

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

  onTouchStart(e) {
    let {clientX:x, clientY:y} = e.targetTouches[0]
      this.setState({
        lastTouchStart: {x, y}
      })
  }

  onTouchMove(e) {
    let {clientX:x, clientY:y} = e.targetTouches[0]
    let lastTouchStart = this.state.lastTouchStart
    let deltaXRatio = (x - lastTouchStart.x) / clientWidth
    let rgbaValue = deltaXRatio > 0 ? `rgba(0, 128, 0, ${Math.abs(deltaXRatio)})` : `rgba(204, 0, 0, ${Math.abs(deltaXRatio)})`
    document.body.style.backgroundColor = rgbaValue
  }

  onTouchEnd(e) {
    document.body.style.backgroundColor = 'white'
  }

  onKeyDown(e) {
    if (e.keyIdentifier === 'Up') this.props.onBackToAllDecks()
    else if (e.keyIdentifier === 'Left') this.props.onAnsweredIncorrectly()
    else if (e.keyIdentifier === 'Right') this.props.onAnsweredCorrectly()
    else if (e.keyIdentifier === 'Down') this.props.onSkip()
    else if (e.keyCode === 32) this.flipCard() // SPACE
    else this.flipCard()
  }

  componentDidMount() {
    if (window.iNoBounce) window.iNoBounce.enable()
    this._keyDownListener = this.onKeyDown.bind(this)
    document.addEventListener('keydown', this._keyDownListener)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._keyDownListener)
  }

  render() {
    let style = {
      transition: '1s',
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
    text = text
            .replace(/\s\s/g, '<br/><br/>')
            .replace(/\\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replace(/\\n/g, '<br/>')
    let dangerousHtml = {__html: text}

    return (
      <div className="flashcard" style={style} onClick={this.flipCard.bind(this)} onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
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
