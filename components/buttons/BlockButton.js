import React, {Component} from 'react'

export default class BlockButton extends Component {
  constructor(props) {
    super(props)
  }

  onClick(e) {
    if (window.hasTouch) {
      // Assert: has already been handled by touchStart
      console.log('Ignoring "click" event because it was already handled by touchStart')
      e.preventDefault()
      return
    }

    return this.props.onClick.apply(this, arguments)
  }

  onTouchTap() {
    return this.props.onClick.apply(this, arguments)
  }

  render() {
    let parentStyle = {
      height: '4em',
      cursor: 'pointer',
      borderWidth: 1,
      borderColor: 'black',
      borderStyle: 'dotted',
      // padding: '5px 0',
      marginTop: 5,
      display: 'inline-block',
      boxSizing: 'border-box',
      width: '100%'
    }

    let childStyle = {
      color: 'black',
      display: 'block',
      textAlign: 'center',
      width: '100%',
      textDecoration: 'none',
      fontSize: 16,
      boxSizing: 'border-box',
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'
    }

    Object.assign(parentStyle, this.props.style)
    if (this.props.theme === 'right') {
      parentStyle.borderColor = 'green'
      childStyle.color = 'green'
    } else if (this.props.theme === 'wrong') {
      parentStyle.borderColor = '#c00'
      childStyle.color = '#c00'
    } else if (this.props.theme === 'skip') {
      parentStyle.borderColor = 'gray'
      childStyle.color = 'gray'
    } else if (this.props.theme === 'flip') {
      // parentStyle.borderColor = 'blue'
      // childStyle.color = 'blue'
      childStyle.fontWeight = 'bold'
    } else {
      // Nothing.
    }

    return (
      <div style={parentStyle} onTouchTap={this.onTouchTap.bind(this)} onClick={this.onClick.bind(this)}>
        <span style={childStyle}>{this.props.children}</span>
      </div>
    )
  }
}

BlockButton.defaultProps = {theme: 'regular'};
