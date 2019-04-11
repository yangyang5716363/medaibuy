import React, { PureComponent } from 'react'
import { Badge, Tooltip, Icon } from 'antd'
import moment from 'moment'
import numeral from 'numeral'
import { formatMessage } from 'umi-plugin-locale'
const cfgs = {
  1: 'facebook',
  2: 'native',
  3: 'adult'
}
export default class DesignBoard extends PureComponent {
  constructor(props) {
    super(props)
    this.linkType = {
      1: 'facebook',
      2: 'native',
      3: 'adult'
    }
  }

  generatorAdsLink({ linkType, updateAdLinkType, offer, date }) {
    let type = linkType in this.linkType ? this.linkType[linkType] : 'facebook'
    let _type = updateAdLinkType in this.linkType ? this.linkType[updateAdLinkType] : 'facebook'
    let _date = [`${date} 00:00:00`,`${date} 23:59:59`]
    _date = _date.join(',')
    return [
      `/samples?type=${type}&offerName=${offer}&flag=1`,
      `/samples?type=${_type}&offerName=${offer}&lastSeenDate=${_date}&flag=1`
    ]
  }
  render() {
    const { id, dataSource = {}, onOpenPub, onOpenGEO } = this.props
    const {
      offerTitle,
      offerPage,
      affiliateNetwork,
      trafficNetwork,
      updatedDate: date,
      offerName: offer,
      adNumInfo: ads = {},
      pubNumInfo: pub,
      geoNumInfo: geo
    } = dataSource
    const link = this.generatorAdsLink({ 
      linkType: ads.adLinkType, 
      updateAdLinkType: ads.updateAdLinkType,
      offer,
      date
    })
    let pre = moment(date).subtract(1, 'd').format('YYYY.MM.DD')
    return (
      <div className="offer-overview" id={id}>
        <div className="offer-overview-option">
          <section className="offer-overview-option-item">
            <span className="offer-overview-option__title">
              {formatMessage({ id: 'app.offer.baisc.date-label' })}
              <Tooltip 
                placement="right" 
                title={formatMessage({ id: 'app.offer.basic.date-help' })}
              >
                <span className="crawl-opt__help">
                  <Icon type="question-circle" />
                </span>
              </Tooltip>
            </span>
            <div className="offer-overview-option__value">
              <span>
                { date || '-' }
              </span>
            </div>
          </section>
          <section className="offer-overview-option-item">
            <span className="offer-overview-option__title">
              {formatMessage({ id: 'app.offer.basic.ads-label' })}
              <Tooltip 
                placement="right" 
                title={formatMessage({ id: 'app.offer.basic.ads-help' })}
              >
                <span className="crawl-opt__help">
                  <Icon type="question-circle" />
                </span>
              </Tooltip>
            </span>
            <div className="offer-overview-option__value">
              <a className="overview-link" target="__blank" href={link[0]}>
                {ads && ads.total}
              </a>   
              <a className="overview-links" target="__blank" href={link[1]}>
                {ads && ads.realValue || '-'}
              </a>
              <Tooltip 
                key="ad-3"
                placement="right" 
                title={formatMessage({ id: 'app.offer.basic.ads-change'}, { date: pre })}
              >
                <Badge 
                  className="overview-count" 
                  count={numeral(ads && ads.change).format('0%')} 
                  style={{ 
                    backgroundColor: ads && ads.flag > 0 ? '#00BC5E': '#EF6F6F'
                  }} 
                />
              </Tooltip>
            </div>
          </section>
          <section className="offer-overview-option-item">
            <span className="offer-overview-option__title">
              {formatMessage({ id: 'app.offer.basic.pub-label' })}
              <Tooltip 
                placement="right" 
                title={formatMessage({ id: 'app.offer.basic.pub-help' })}
              >
                <span className="crawl-opt__help">
                  <Icon type="question-circle" />
                </span>
              </Tooltip>
            </span>
            <div className="offer-overview-option__value">
              <a className="overview-link" target="__blank" onClick={onOpenPub}>
                {pub && pub.total}
              </a>   
              <a className="overview-links" target="__blank" onClick={onOpenPub}>
                {pub && pub.realValue || '-'}
              </a>
              <Tooltip 
                placement="right" 
                title={formatMessage({ id: 'app.offer.basic.pub-change'}, { date: pre })}
              >
                <Badge 
                  className="overview-count" 
                  count={numeral(pub && pub.change).format('0%')} 
                  style={{ 
                    backgroundColor: pub && pub.flag > 0 ? '#00BC5E': '#EF6F6F'
                  }} 
                />
              </Tooltip>
            </div>
          </section>
          <section className="offer-overview-option-item">
            <span className="offer-overview-option__title">
              {formatMessage({ id: 'app.offer.basic.geo-label' })}
              <Tooltip 
                placement="right" 
                title={formatMessage({ id: 'app.offer.basic.geo-help' })}
              >
                <span className="crawl-opt__help">
                  <Icon type="question-circle" />
                </span>
              </Tooltip>
            </span>
            <div className="offer-overview-option__value">
              <a className="overview-link" target="__blank" onClick={onOpenGEO}>
                {geo && geo.total}
              </a>   
              <a className="overview-links" target="__blank" onClick={onOpenGEO}>
                {geo && geo.realValue || '-'}
              </a>
              <Tooltip 
                placement="right" 
                title={formatMessage({ id: 'app.offer.basic.geo-change'}, { date: pre })}
              >
                <Badge 
                  className="overview-count" 
                  count={numeral(geo && geo.change).format('0%')} 
                  style={{ 
                    backgroundColor: geo && geo.flag > 0 ? '#00BC5E': '#EF6F6F'
                  }} 
                />
              </Tooltip>
            </div>
          </section>
          <section className="offer-overview-option-item">
          <span className="offer-overview-option__title">
            {formatMessage({ id: 'app.offer.basic.page-label' })}
            <Tooltip 
              placement="right" 
              title={formatMessage({ id: 'app.offer.basic.page-help' })}
            >
              <span className="crawl-opt__help">
                <Icon type="question-circle" />
              </span>
            </Tooltip>
          </span>
          <div className="offer-overview-option__value">
            {
              offerPage ? (
                <a className="overview-link" target="__blank" href={offerPage}>
                  {formatMessage({ id: 'app.offer.basic.page-content'})}
                </a>
              ) : '-'
            }
          </div>
        </section>
        </div>
        <div className="offer-overview-desc">
          <section className="offer-overview-desc-item">
            <label>{formatMessage({ id: 'app.offer.basic.title' })}</label>
            <span>{offerTitle || '-'}</span>
          </section>
          <section className="offer-overview-desc-item">
            <label>{formatMessage({ id: 'app.offer.basic.affilate' })}</label>
            <span>{affiliateNetwork || '-'}</span>
          </section>
          <section className="offer-overview-desc-item">
            <label>{formatMessage({ id: 'app.offer.basic.traflic' })}</label>
            <span>{trafficNetwork || '-'}</span>
          </section>
        </div>
      </div>
    )
  }
}
