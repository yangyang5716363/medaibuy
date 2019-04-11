import React, { PureComponent } from 'react'
import { Spin } from 'antd'
import NoData from '@/components/NoData'
import _ from 'lodash'

const dStyle = {
  width: "100%", 
  height: 320,
}
export default function (styles = dStyle) {
  return WrappedComponent => {
    return class extends PureComponent {
      constructor(props) {
        super(props)
        this.resize = _.throttle(this.onResize, 500)
      }
      componentDidMount() {
        window.addEventListener('resize', this.resize)
      }
      onResize = () => {
        if (this.wapper) {
          this.wapper.resize && this.wapper.resize()
        }
      }
      render() {
        const { loading, data, style, ...props} = this.props
        if (loading) {
          return (
            <Spin>
              <div style= {{ ...styles}} className="gloab-empty"/>
            </Spin>
          )
        } else if ( !Array.isArray(data) || Array.isArray(data) && data.length === 0) {
          return (
            <div style= {{ ...styles}} className="gloab-empty">
              <NoData />
            </div>
          )
        }
        return (
          <WrappedComponent
            ref={c => this.wapper = c}
            data={data} 
            style={{...styles, ...style }} 
            {...props} 
          />
        )
      }
    }
  }
}
