import React, { PureComponent } from 'react'
import Follow from '@/components/Follow'
import './styles.scss'

export default class Fringe extends PureComponent {
  static defaultProps = {
    btnIcon: 'plus',
    btnText: 'Add to Favorites'
  }
  constructor(props) {
    super(props)
    this.state = {
      selectKey: props.selectKey || null
    }
  }
  onClick = (record) => {
    this.setState({
      selectKey: record.key
    }, () => {
      const { onAction } = this.props
      onAction && onAction(record.key)
    })
  }
 
  render() {
    const { title, isFollow, onFollow,  onClick, action } = this.props
    const { selectKey } = this.state
    return (
      <div className="offer-fringe">
        <div className="offer-fringe-left">
          <span className="offer-fringe__title">{title}</span>
          {
            onFollow && (
              <span className="offer-fringe__btn">
                <Follow status={isFollow} onFollow={onFollow}/>
              </span>
            )
          }
        </div>
        <div className="offer-fringe-right">
          {
            Array.isArray(action) 
            && action.filter(item => item.visible === undefined || item.visible === true)
            .map(item => (
              <span 
                key={item.key}
                data-actived={item.key === selectKey}
                className="offer-fringe__action"
                onClick={() => this.onClick(item)}
              >
                {item.name}
              </span>
            ))
          }
        </div>
      </div>
    )
  }
}