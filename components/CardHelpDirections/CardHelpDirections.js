/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { PropTypes } from 'react'
import config from '../../config'
import moment from 'moment'

export default class CardHelpDirections extends React.Component {
  render() {
    let style = {
      fontSize: 10,
      position: 'absolute',
      bottom: '25%',
      width: '50%',
      // margin: 'auto',
      display: 'block',
      left: '50%',
      transform: 'translateX(-50%)'
    }
    Object.assign(style, this.props.style)
    return (
      <img style={style} src="card-helper-compass.svg"/>
    )
  }
}
