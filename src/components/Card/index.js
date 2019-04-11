import React, { PureComponent } from 'react'
import Link from 'umi/link'
import defaultImage from '@/assets/defaultOffer.png'
import Follow from '@/components/Follow'
import './styles.scss'

export default class extends PureComponent {
  constructor(props) {
    super(props)
  }
  // 点击title 跳转
  onTitleClick = (e) => {
    const { toTitle } = this.props
    if (toTitle) {
      e.stopPropagation()
      toTitle && window.open(toTitle)
    }
  }
  // 点击卡片跳转
  onClick = (e) => {
    e.stopPropagation()
    const { to } = this.props
    to && window.open(to)
  }
  render() {
    const { style, dataPool, sourceName, onFollow } = this.props
    const { logo, title, desc, grid, sources, id, isFollow } = dataPool

    return (
      <div 
        className="card-offer" 
        style={style}
        onClick={this.onClick}
        data-id={id}
      >
        {
          onFollow && (
            <div className="card-offer__suspend">
              <Follow 
                status={isFollow} 
                onFollow={s => onFollow({ isFollow: s, id })}
              />
            </div>
          )
        }
        <div className="card-offer-header">
          {
            logo && (
              <div className="card-offer-header__logo">
                <img src={logo || defaultImage } onError={e => e.target.src = defaultImage}/>
              </div>
            )
          }
          {
            title && (
              <div 
                className="card-offer-header__title"
                onClick={this.onTitleClick}
              >
                <span>{title}</span>
              </div>
            )
          }
        </div>
        <div className="card-offer-body">
          <div className="card-offer-body__desc">
            {desc}
          </div>
          <div className="card-offer-body__grid">
          {
            grid && Object.keys(grid).map(k => (
              
              <div key={k} className="card-offer-body__grid-item">
                <span>{k}</span>
                <span>{grid[k] || '-'}</span>
              </div>
            ))
          }
          </div>
        </div>
        <div className="card-offer-footer">
          <span>{sourceName}</span>
          {
            Array.isArray(sources) && (
              <div className="card-offer-footer__svg">
                {sources[0] && <span data-role="dsp-adult" />}
                {sources[2] && <span data-role="dsp-native" />}
                {sources[1] && <span data-role="fb" />}
              </div>
            )
          }
          
        </div>
      </div>
    )
  }
}
