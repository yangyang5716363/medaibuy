import React, { PureComponent } from 'react'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

import _ from 'lodash'
const defaultConfig = {
  refreshRate: 16
}
const resizeMe = (config = defaultConfig) => {
  return WrappedComponent => {
    return class Warpper extends PureComponent {
      constructor(props) {
        super(props)
        this.onResizeStrategy = _.throttle(this.onResize, config.refreshRate)
        this.state = {
          width: undefined,
          height: undefined,
          position: undefined,
          columnWidth: props.columnWidth,
          count: 6
        }
      }
      componentDidMount() {
        let element = this.element.parentNode
        this.resizeSensor = new ResizeSensor(element, this.onResizeStrategy)
        this.onResizeStrategy()
      }
      componentWillUnmount() {
        const element = this.element.parentNode;
        this.resizeSensor.detach(element, this.onResizeStrategy);
      }

      onResize = () => {
        if (!this.element) return 
        const element = this.element.parentNode
        const { columnWidth, gutter } = this.props
        const {
          width,
          height,
          paddingLeft,
          paddingRight,
          paddingTop,
          paddingBottom
        } = getComputedStyle(element) // css-element-queries 集成到window 上的
        const size = {
          columnWidth,
          width:  parseInt(width, 10) - parseInt(paddingLeft, 10) - parseInt(paddingRight, 10),
          height: parseInt(height, 10) - parseInt(paddingTop, 10) -parseInt(paddingBottom, 10)
        }
        if (size.width && columnWidth) {
          let wh = size.width + gutter
          let gridWidth = columnWidth
          let count = Math.floor(wh / gridWidth)
          let mod = wh % gridWidth
          if (mod > gridWidth / 2 ) {
            count += 1
          }
          size.columnWidth = wh / count - gutter
          size.count = count
        }
        this.setState(size)
      }
      render() {
        const { className, slice, dataSource, ...otherProps } = this.props
        const { width, height, columnWidth, count } = this.state
        const styles = {
          position: 'relative',
          width: '100%',
          height: '100%'
        }
        let _data = slice ? dataSource.slice(0, count) : dataSource
        return (
          <div 
            className={className}
            ref={node => this.element = node}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            { 
              width && height ? (
                <WrappedComponent {...otherProps}  dataSource={_data} size={{width, height}} columnWidth={columnWidth} />
              ) : null
            }
        
          </div>
        )
      }
    }
  }
}
export default resizeMe
