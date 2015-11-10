/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react'
import config from '../../config'
import moment from 'moment'

export default class CardMetadata extends React.Component {
  render() {
    let style = {
      fontSize: 10,
      position: 'absolute',
      bottom: 10
    }
    Object.assign(style, this.props.style)
    return (
      <div style={style}>
        Last seen: {this.props.lastSeen === null ? 'never' : moment().to(this.props.lastSeen)}
        <br/>
        Answered correctly: {this.props.numRightAnswers ? this.props.numRightAnswers : 0} times
        <br/>
        Answered wrongly: {this.props.numWrongAnswers ? this.props.numWrongAnswers : 0} times
      </div>
    )
  }
}
