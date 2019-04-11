import React, { PureComponent, Children } from 'react'
import cs from 'classnames'
import './styles.scss'

export default class Partition extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { label, children } = this.props
    return (
      <div className="partition">
        <div 
          className={cs('partition__line', {
            'partition__line-label': label
          })} 
          data-label={label}
        />
        {
          children && (
            <div className="partition__children">
              {children}
            </div>
          )
        }
      </div>
    )
  }
}