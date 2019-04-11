import React, { PureComponent } from 'react'
export default class Sign extends PureComponent{
  render(){
    return (
      this.props.isSet ? (
        <span style={{ color: '#3dbd7d', marginRight: '15px' }}><i
          className="icon iconfont icon-check-circle-o"
        /> Set
        </span>
      ) : (
        <span style={{ color: '#f96868', marginRight: '15px' }}><i
          className="icon iconfont icon-close-circle-o"
        /> Not set
        </span>
      )
    )
  }
}