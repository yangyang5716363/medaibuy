import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'
import cs from 'classnames'

import './styles.scss'
export default class extends Component {
  static propTypes = {
    option: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    })),
    selectKey: PropTypes.string,
    onToggle: PropTypes.func,
    onNotice: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      selectKey: props.selectKey || null
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('selectKey' in nextProps) {
      this.setState({ selectKey: nextProps.selectKey })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
  }

  onClick = (item, disabled, e) => {
    const { onToggle,  onNotice } = this.props
    if (!!disabled) {
      onNotice && onNotice(item, e)
    } else {
      this.setState({ selectKey: item.key }, () => {
        onToggle && onToggle(item, e)
      })
    }
  }
  render() {
    const { option } = this.props
    const { selectKey } = this.state
    return (
      <div className="switcher">
        {
          option.map(({ disabled, key, name }) => (
            <span
              key={key} 
              className={cs('switcher-item', {
                'switcher-item__checked': key === selectKey,
                'switcher-item__disabled': disabled
              })}
              onClick={(e) => this.onClick({ key, name }, disabled, e)}
            >
             {name}
            </span>
          ))
        }
      </div>
    )
  }
}