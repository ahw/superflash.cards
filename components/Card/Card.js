/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, {PropTypes} from 'react'
import config from '../../config'
import moment from 'moment'
import BlockButton from '../buttons/BlockButton'
import ProgressMeter from '../progress-meter'
import CardHelpDirections from '../CardHelpDirections'
import './Card.scss'
import MarkdownIt from 'markdown-it'
let md = new MarkdownIt()

let answerColor = 'gray'; // '#3E96FF' // 'rgb(0, 62, 136)' // #0678FE'

function linearTransform(domain, range, x) {
  // rise / run
  let slope = (range[1] - range[0]) / (domain[1] - domain[0])
  // b = y - mx
  var intercept = range[0] - slope * domain[0]
  if (typeof x === "number") {
      // If a domain value was provided, return the transformed result
      return slope * x + intercept
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
    super(props)
    this.state = {
      isShowingQuestion: !!props.isShowingQuestion,
      skipOpacity: 0,
      backOpacity: 0
    }
  }

  showAnswer() {
    this.setState({
      isShowingQuestion: false
    })
  }

  showQuestion() {
    this.setState({
      isShowingQuestion: true
    })
  }

  flipCard() {
    this.props.onFlip()
    this.setState({
      isShowingQuestion: !this.state.isShowingQuestion
    })
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
    this.setState({
      backgroundColor: rgbaValue,
      skipOpacity: deltaYRatio > 0 ? deltaYRatio : 0,
      backOpacity: deltaYRatio < 0 ? Math.abs(deltaYRatio) : 0
    })
  }

  onTouchEnd(e) {
    this.setState({
      backgroundColor: 'transparent'
    })
  }

  onKeyDown(e) {
    if (e.code === 'ArrowUp') this.props.onBackToAllDecks()
    else if (e.code === 'ArrowLeft') this.props.onAnsweredIncorrectly()
    else if (e.code === 'ArrowRight') this.props.onAnsweredCorrectly()
    else if (e.code === 'ArrowDown') this.props.onSkip()
    else if (e.code === 'Space') this.flipCard()
    else if (e.code === 'Escape') this.props.onBackToAllDecks()
    else this.flipCard()
  }

  componentDidMount() {
    if (window.iNoBounce) window.iNoBounce.enable()
    this._keyDownListener = this.onKeyDown.bind(this)
    document.addEventListener('keydown', this._keyDownListener)

    // Search again for math on the page to typeset
    // See http://stackoverflow.com/questions/5200545/how-to-recall-or-restart-mathjax
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }

  componentDidUpdate() {
    // Search again for math on the page to typeset
    // See http://stackoverflow.com/questions/5200545/how-to-recall-or-restart-mathjax
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._keyDownListener)
  }

  render() {
    let color = this.state.isShowingQuestion ? 'black' : answerColor

    let style = {
      // height: window.document.documentElement.clientHeight - 20 - 15, // to account for padding + navigation
      color,
      backgroundColor: this.state.backgroundColor || 'transparent'
    }

    let text = this.state.isShowingQuestion ? this.props.question : this.props.answer

    let markdownText = text
            .replace(/   /g, "\n\n")
            .replace(/  /g, "\n")
            .replace(/\\t/g, "    ")
            .replace(/\\n/g, "\n\n")
            .replace(/^(Definition):\s/, "### $1\n")

    let html = md.render(markdownText)
      .replace(/___\.\.\./g, '<span class="blankspace">&hellip;</span>')
      .replace(/___/g, '<span class="blankspace"></span>')

    let dangerousHtml = {__html: html}

    return (
      <div className="flashcard" style={style} onClick={this.flipCard.bind(this)} onTouchStart={this.onTouchStart.bind(this)} onTouchMove={this.onTouchMove.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
          <h1 className="flashcard-header">{this.props.hasAnsweredAllCorrectly ? star : ''} {this.state.isShowingQuestion ? "Question" : "Answer"}</h1>
          <div className="flashcard-content" dangerouslySetInnerHTML={dangerousHtml} style={{margin: 'auto',  width: '85%'}}/>
          <span style={{fontSize: 24, position:'absolute', display: 'block', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: this.state.skipOpacity}}>Skip</span>
          <span style={{fontSize: 24, position:'absolute', display: 'block', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: this.state.backOpacity}}>Home</span>
      </div>
   )
  }
}

Card.defaultProps = { lastSeen: null, isShowingQuestion: true, onFlip: function() {} }
