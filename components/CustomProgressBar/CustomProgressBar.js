import React, {Component} from 'react'

export default class CustomProgressBar extends Component {
  // Usage:
  //
  // let divisions = [
  //  { name: "right", num: 17, style: { ... } },
  //  { name: "wrong", num: 10, style: { ... } },
  //  { name: "unanswered", num: 6, style: { ... } }
  // ]
  //
  // render() {
  //  let parentStyle = {background: 'gray'}
  //  return <CustomProgressBar style={parentStyle} divisions={divisions}/>
  // }

  render() {
    debugger
    let parentStyle = {background: '#eee', height: 5, boxSizing: 'border-box'}
    Object.assign(parentStyle, this.props.style)

    let totalNumber = this.props.divisions.map((division) => {
      console.log('returning', division.num)
      return division.num
    }).reduce((previousValue, currentValue, index, array) => {
      console.log(`returning ${previousValue} + ${currentValue} = ${previousValue+currentValue}`)
      return previousValue + currentValue
    }, 0)
    console.log('totalNumber = ', totalNumber)

    let divisions = this.props.divisions.map((division) => {
      let percentWidth = 100 * division.num / totalNumber
      let style = {
        height:'100%',
        width: percentWidth + '%',
        background: 'gray'
      }
      Object.assign(style, division.style)
      return <div key={division.name} style={style}></div>
    })

    return (
      <div style={parentStyle}>
        {divisions}
      </div>
    )
  }
}

CustomProgressBar.propTypes = {
  divisions: PropTypes.array.isRequired,
}
