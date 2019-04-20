import React, {Component} from 'react'

export default class ProgressMeter extends Component {
  render() {
    // let parentStyle = {borderStyle: 'solid', borderWidth:1, borderColor: this.props.color, height: this.props.height, boxSizing: 'border-box'}
    let parentStyle = {background: '#eee', height: this.props.height, boxSizing: 'border-box'}
    Object.assign(parentStyle, this.props.style)
    return (
      <div style={parentStyle}>
        <div style={{height:'100%', width: 100 * this.props.complete + '%', background: this.props.color}}></div>
      </div>
    )
  }
}
