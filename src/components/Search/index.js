import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import Search from './Search'
import './styles.scss'
export default class SearchPortal extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() { 
    const { node, ...props } = this.props
    if (node) {
      return ReactDOM.createPortal(<Search {...props} />, node)
    }
    return (<Search {...props} />)
  }
}