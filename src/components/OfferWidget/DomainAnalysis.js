import React, { PureComponent} from 'react'
import { formatMessage } from 'umi-plugin-locale'
import CountryIcon from '@/components/CountryIcon'
import './styles.scss'
import _ from 'lodash'

import { Statistic, Icon, Tooltip } from 'antd'

export default class OfferDomain extends PureComponent {
  renderTitle({ title, color, desc, img, icon, help }) {
    return [
      <span key={`${title}-1`} style={{ color }}>
        { 
          img ? <CountryIcon type={img}/>
          : <Icon type={icon} /> 
        }
      </span>,
      <span key={`${title}-2`} className="offer-domain-analysis__title">
        {title}
      </span>,
      desc && <span key={`${title-3}`} className="offer-domain-analysis__help">
        <Tooltip placement="right" title={desc}>
          <Icon type="question-circle" />
        </Tooltip>
      </span>

    ]
  }
  render() {
    const { data = {}, ...props} =this.props
    const {
      bounceRate,
      countryCode, 
      worldRanking,
      naturalRanking,
      monthlyVisit,
      perPages,
      durationTime
    } = data
    return (
      <div className="offer-domain-analysis" {...props}>
        <div className="offer-domain-analysis__item">
          <Statistic 
            title={this.renderTitle({ 
              icon: 'global',
              color: '#58C48C', 
              title: 'Global Rank',
              desc: formatMessage({ id: 'app.offer.domain.analyisi-global' })
            })} 
            value={worldRanking || 0} 
          />
        </div>
        <div className="offer-domain-analysis__item">
          <Statistic
            title={this.renderTitle({
              img: countryCode,
              title: 'Country Rank',
              desc: formatMessage({ id: 'app.offer.domain.analyisi-country' })
            })}
            value={naturalRanking || 0} 
          />
        </div>
        <div className="offer-domain-analysis__item">
          <Statistic
            title={this.renderTitle({ 
              icon: 'bar-chart',
              color: '#8997E4', 
              title: 'Monthly Visits', 
              desc: formatMessage({ id: 'app.offer.domain.analyisi-monthly' })
            })}
            value={monthlyVisit && _.round(monthlyVisit)|| 0}        
          />
        </div>
        <div className="offer-domain-analysis__item">
          <Statistic
            title={this.renderTitle({ 
              icon: 'line-chart',
              color: '#CCA3E5', 
              title: 'Bounce Rate', 
            })}
            value={bounceRate && _.round(bounceRate * 100, 2)|| 0} 
            suffix="%"
          />
        </div>
        <div className="offer-domain-analysis__item">
          <Statistic
            title={this.renderTitle({ 
              icon: 'copy',
              color: '#56D1E0', 
              title: 'Pages Visits', 
            })}
            value={perPages && _.round(perPages)|| 0}
          />
        </div>
        <div className="offer-domain-analysis__item">
          <Statistic
            title={this.renderTitle({ 
              icon: 'dashboard',
              color: '#F3A1A1', 
              title: 'Avg Visit Duration'
            })}
            value={durationTime && _.round(durationTime)|| 0} 
          />
        </div>
      </div>
    )
  }
}