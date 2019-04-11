import React, { PureComponent } from 'react'
import isEqual from 'react-fast-compare'
import { isImmutable} from 'immutable'
import Masonry from 'masonry-layout'
import resize from './resize'
@resize({ refreshRate: 50 })
export default class WaterWall extends PureComponent {
  static defaultProps = {
    columnWidth: 240,
    gutter: 24,
    percentPosition: false,
    originLeft: true,
    fitWidth: true
  }
  componentDidMount() {
    const { 
      columnWidth, 
      gutter, 
      percentPosition,
      originLeft,
      fitWidth,
      getInstance
    } = this.props
    this.msnry = new Masonry(this.node, {
      itemSelector: '.water--item',
      columnWidth: '.water--item',
      gutter: gutter,
      percentPosition,
      originLeft,
      fitWidth
    })
    if (getInstance) getInstance(this)
  }
  componentDidUpdate(prevProps) { 
    if (JSON.stringify(prevProps.size) !== JSON.stringify(this.props.size)) {
      this.resizeLayout()
    }
    if (isImmutable(prevProps.dataSource)) {
      if (JSON.stringify(prevProps.dataSource) !== JSON.stringify(this.props.dataSource)) {
        this.resizeLayout(true)
      }
    } else {
      if (prevProps.dataSource.length !== this.props.dataSource.length) {
        this.resizeLayout(true)
      }
    }

  }
  componentWillUnmount() {
    this.msnry.destroy();
  }
  onLayoutComplete = items => {
    const { onLayout } = this.props;
    onLayout && onLayout(items, this.msnry);
  }
  resizeLayout(reload) {
    if (reload) {
      this.msnry.reloadItems()
    }
    this.msnry.layout()
  }
  renderItem = dataSource => {
    const { render, columnWidth, gutter, itemStyle } = this.props
    const renderFunc = render ? render : item => item
    const style = { width : columnWidth }
    if (gutter) {
      style.marginBottom = gutter
    }

    return dataSource.map((item, index) => {
      return (
        <div 
          key={index}
          className="water--item"
          style={{ ...style, ...itemStyle}}
        >
          { renderFunc(item, index, { columnWidth }) }
        </div>
      )
    })
  }
  render() {
    const { dataSource, style } = this.props    
    return (
      <div 
        className="water-container"
        ref={node => this.node = node}
        style={{ ...style }}
      >
        { this.renderItem(dataSource) }
      </div>
    )
  }
}