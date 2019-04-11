import React, { PureComponent } from 'react'
import { Tooltip, Icon } from 'antd'
import cs from 'classnames'
import './styles.scss'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      actived: props.actived || null
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('actived' in nextProps) {
      this.setState({ 
        actived: nextProps.actived
      })
    }
  }
  onClick = (item) => {
    this.setState({
      actived: item.key
    }, () => {
      this.props.onSwitch && this.props.onSwitch(item.key, item)
    })
  }
  render () {
    const { option, help } = this.props
    const { actived } = this.state
    return (
      <div className="button-group">
        <div className="button-group__option">
          {
            Array.isArray(option) && option.map((item, idx) => (
              <span 
                key={item.key || idx}
                className={cs('button-group__option-item', {
                  'button-group__option-actived': actived === item.key
                })}
                onClick={() => this.onClick(item)}
              >
                {item.name}
              </span>
            ))
          }
        </div>

        {
          help && (
            <Tooltip placement="right" title={help}>
              <span className="button-group__help">
                <Icon type="question-circle" />
              </span>
            </Tooltip>
          )
        }
      </div>
    )
  }
}