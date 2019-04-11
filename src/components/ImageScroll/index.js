import React, { PureComponent } from 'react'
import { Carousel } from 'antd'
import BizIcon from '@/components/BizIcon'
import './styles.scss'

// 播放组件
export default class extends PureComponent {
  constructor (props) {
    super(props)
    this.carousel = React.createRef()
  }

  next () {
    this.carousel.current.next()
  }

  prev () {
    this.carousel.current.prev()
  }

  render () {
    const { image: { image } } = this.props
    const next = this.next.bind(this)
    const prev = this.prev.bind(this)

    return (
      <div className="common-image-scroll">
        <span className="common-image-scroll__btn-left" onClick={ prev }>
          <BizIcon type="left" />
        </span>

        <Carousel ref={ this.carousel }>
          { ( image && image.length ) && image.map( (img, key) => <div key={ key }><img src={ img.url } /></div>) }
        </Carousel>
        
        <span className="common-image-scroll__btn-right" onClick={ next }>
          <BizIcon type="right" />
        </span>
      </div>
    )
  }
}
