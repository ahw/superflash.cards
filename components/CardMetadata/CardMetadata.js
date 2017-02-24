/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react'
import config from '../../config'
import moment from 'moment'
import './CardMetadata.scss'

export default class CardMetadata extends React.Component {
  render() {
    let style = {
      fontSize: 10,
      position: 'absolute',
      bottom: 10
    }
    Object.assign(style, this.props.style)

    const numRightAnswers = this.props.numRightAnswers || 0;
    const numWrongAnswers = this.props.numWrongAnswers || 0;
    const totalAnswers = numRightAnswers + numWrongAnswers;

    return (
      <div className="card-bottom-info">
        <ul className="card-directions">
          <li><strong>&larr;</strong> don't know</li>
          <li><strong>&uarr;</strong> home</li>
          <li><strong>&darr;</strong> skip</li>
          <li><strong>&rarr;</strong> know</li>
        </ul>
        <div className="card-metadata">
          Last seen {this.props.lastSeen === null ? 'never' : moment().to(this.props.lastSeen)}.
          Answered correctly {numRightAnswers}/{numRightAnswers + numWrongAnswers} times
        </div>
      </div>
    )
  }
}
