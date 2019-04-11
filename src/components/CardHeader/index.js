import React, { PureComponent } from 'react'
import ButtonGroup from '../ButtonGroup'
import SelectList from './select'
import Tips from './tips'
import More from './more'
import './styles.scss'

export default class extends PureComponent {
  constructor(props) {
    super(props)
  }

  render () {
    const { 
      title, 
      style, 
      buttonOps = {}, 
      selectOps = {}, 
      tipsOps = {},
      onMoreClick,
      onSelectClick,
      onButtonClick,
      links,
    } = this.props

    return (
      <div className="page-header">
        <div className="page-header__title" style={ style }>
          <h3>{ title }</h3>
          <Tips { ...tipsOps } />
        </div>

        {/* 功能配置 */}
        <div className="page-header__features" style={ style }>
          <ButtonGroup { ...buttonOps } onButtonClick={ onButtonClick } />

          <div className="page-header__select">
            <SelectList { ...selectOps } onSelectClick={ onSelectClick } />
          </div>
          
          <More { ...links } onMoreClick={ onMoreClick } />
        </div>
      </div>
    )
  }
}