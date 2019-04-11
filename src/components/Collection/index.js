import React, { PureComponent } from 'react'
import cs from 'classnames'
import BizIcon from '@/components/BizIcon'
import './styles.scss'

let activeIcon = 'collection'
let undefainIcon = 'collection-o'

// 收藏组件
export default class extends PureComponent {
  state = {
    icon: undefainIcon,
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { icon = undefainIcon } = this.props

    // 是否是已收藏状态
    this.setState({
      icon,
    })
  }

  onClick (icon, event) {
    event.stopPropagation()
    this.setCollection(icon)
  }

  setCollection (icon) {
    const { collection, adId } = this.props
    this.setState({
      icon: icon === activeIcon ? undefainIcon : activeIcon
    }, () => collection(adId, icon) )
  }

  render () {
    let { icon } = this.state

    return (
      <div className="common-collection" onClick={ this.onClick.bind(this, icon) }>
        <BizIcon type={ icon } />
        <span>Collection</span>
      </div>
    )
  }
}