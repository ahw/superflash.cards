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
import './Card.scss';
// import CustomProgressBar from '../CustomProgressBar'

let answerColor = 'rgb(0, 62, 136)' // #0678FE'

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

let getRotation = linearTransform([-1, 1], [-10, 10])
let getYTranslation = linearTransform([0, 1], [0, -100])

let starStyle = {
  display: 'block',
  position: 'absolute',
  color: 'gold',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '128px',
  opacity: 0.8
}
let star = <span style={starStyle} dangerouslySetInnerHTML={{__html: '&#9733;'}}/>

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingQuestion: !!props.isShowingQuestion,
      skipOpacity: 0,
      backOpacity: 0
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
    let deltaXRatio = (x - lastTouchStart.x) / window.document.documentElement.clientWidth
    let deltaYRatio = 3 * (y - lastTouchStart.y) / window.document.documentElement.clientHeight
    let rgbaValue = deltaXRatio > 0 ? `rgba(0, 128, 0, ${Math.abs(deltaXRatio)})` : `rgba(204, 0, 0, ${Math.abs(deltaXRatio)})`
    // let transform = `translateX(${x - lastTouchStart.x}px) translateY(${getYTranslation(Math.abs(deltaXRatio))}px) rotate(${getRotation(deltaXRatio)}deg)`
    this.setState({
      backgroundColor: rgbaValue,
      skipOpacity: deltaYRatio > 0 ? deltaYRatio : 0,
      backOpacity: deltaYRatio < 0 ? Math.abs(deltaYRatio) : 0
      // transform
    })
    // document.body.style.backgroundColor = rgbaValue
  }

  onTouchEnd(e) {
    // document.body.style.backgroundColor = 'white'
    this.setState({
      backgroundColor: 'white'
      // transform: 'none'
    })
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
    let color = this.state.isShowingQuestion ? 'black' : answerColor
    if (this.props.lastAnsweredRight === true) {
      color = 'green'
    } else if (this.props.lastAnsweredRight === false) {
      color = '#c00'
    }

    let style = {
      // paddingTop: 20,
      // background: this.state.isShowingQuestion ? 'white' : '#DDF5FF',
      // height: screen.height,
      height: window.document.documentElement.clientHeight - 20, // to account for padding
      color,
      // transform: this.state.transform || 'none',
      backgroundColor: this.state.backgroundColor || 'white'
    }

    let text = this.state.isShowingQuestion ? this.props.question : this.props.answer
    text = text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\s\s\s/g, '<br/><br/>')
            .replace(/\s\s/g, '<br/>')
            .replace(/\\t/g, '&nbsp;&nbsp;')
            .replace(/\\n/g, '<br/>')
            .replace(/^(Definition):\s/, '<strong>$1</strong><br/><br/>')
    let dangerousHtml = {__html: text}

    return (
      <div className="flashcard" style={style} onClick={this.flipCard.bind(this)} onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
          <ProgressMeter color={color} height={5} complete={(this.props.cardIndex+1)/this.props.totalCards}/>
          <h1>{this.props.hasAnsweredAllCorrectly ? star : ''} {this.state.isShowingQuestion ? "Question" : "Answer"}</h1>
          <p dangerouslySetInnerHTML={dangerousHtml} style={{/*position: 'absolute', top: '50%', transform: 'translateY(-60%)', */margin: 'auto',  width: '80%', left: '10%'}}/>
          <span style={{fontSize: 24, position:'absolute', display: 'block', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: this.state.skipOpacity}}>Skip</span>
          <span style={{fontSize: 24, position:'absolute', display: 'block', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: this.state.backOpacity}}>Back</span>

          <CardMetadata style={{/*color: this.state.isShowingQuestion ? 'gray' : answerColor*/}} {...this.props} />
      </div>
    );
  }
}

// Card.propTypes = { initialCount: React.PropTypes.number };
Card.defaultProps = { lastSeen: null, isShowingQuestion: true, onFlip: function() {} };
