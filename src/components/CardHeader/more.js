import React, { PureComponent } from 'react'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind( this )
  }

  onClick (event) {
    const { onMoreClick } = this.props
    event.preventDefault()
    // 点击更多回调
    onMoreClick && onMoreClick(event)
  }

  render () {
    const { style, text } = this.props

    if ( text ) {
      return (<a 
        target="_blank"
        onClick={ this.onClick } 
        className="page-header__links" 
        style={ style }
      >
        { text }&gt;&gt;
      </a>)

    } else {
      return null
    }
  }
}