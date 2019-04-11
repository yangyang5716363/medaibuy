/*
 * @Author: wangjingbo 
 * @Date: 2019-03-23 15:08:36 
 * @Last Modified by: wangjingbo
 * @Last Modified time: 2019-04-11 16:40:25
 */
import './styles.scss'
import React, { PureComponent } from 'react'
import numeral from 'numeral'
import { connect } from 'dva'
import { getRefferralData } from '@/utils'
import { formatMessage } from 'umi/locale'
import copy from 'copy-to-clipboard'
import _ from 'lodash'

import { Spin, Table, Progress, Card, Avatar, Button, message, Badge } from 'antd'
import { deepAt } from '@/utils'

import CountryIcon from '@/components/CountryIcon'
import Crawl from '@/components/Crawl'

import {
  Fringe,
  PublisherModal,
  PublisherTable,
  MoneyPageTable, 
  MoneyPageModal,
  GeoTable, 
  GeoModal,
  OverView,
  DomainBasic,
  DomainAnalysis,
  PhotoWall
} from '@/components/OfferWidget'
import { 
  NativeAds,
  BarChart, 
  PieChart, 
  DoubleLine, 
  OfferLine, 
  ProgressBar, 
  WorldMap, 
  Refferral,
  CountryRank,
  VistisStats
} from '@/components/Chart'


@connect(({ offer, loading }) => {
  return {
    overview: offer.overview,
    analysis: offer.analysis,
    domain: offer.domain,
    loadingDesignBoard: !!loading.effects['offer/fetchDetailOverview'],
    loadingAnalysis: !!loading.effects['offer/fetchDetailAnalysis']
  };
})
export default class extends PureComponent {

  constructor(props) {
    super(props)
    this.element = document.getElementById('primaryLayout')
  }
  onOpenGEO = () => {
    const { analysis } = this.props
    let data = deepAt(analysis, 'geo.list')
    this.refs.geoModal &&  this.refs.geoModal.setData(data)
  }
  onOpenPub= () => {
    const { analysis } = this.props
    let data = deepAt(analysis, 'pub.list')
    this.refs.pubModal &&  this.refs.pubModal.setData(data)
  }
  onOpenMoney= () => {
    const { analysis } = this.props
    let data = deepAt(analysis, 'moneyPage.list')
    this.refs.moneyModal &&  this.refs.moneyModal.setData(data)
  }
  // 锚点操作的action
  onAction = (key) => {
    let element = document.getElementById(key)
    if (element) {
      let to = element.offsetTop + element.offsetHeight - 64 -  (window.innerHeight / 2)
      this.element.scrollTo(0, to)
    } 
  }
  onFollow = (isFollow) => {
    const { overview, dispatch } = this.props
    dispatch({
      type: 'offer/doDetailFollow',
      payload: { 
        id: overview.id,
        isFollow
      }
    })
  }
  render() {
    const { overview, analysis, domain, loadingDesignBoard, loadingAnalysis } = this.props
    const action = [
      { 
        key: 'overview', 
        name: formatMessage({ id: 'app.offer.action-overview' })
      }, { 
        key: 'facebookAds', 
        name: formatMessage({ id: 'app.offer.action-fbAds' }),
        visible: !!deepAt(analysis, 'fbAds.total')
      }, { 
        key: 'nativeAds', 
        name: formatMessage({ id: 'app.offer.action-nativeAds' }),
        visible: !!deepAt(analysis, 'nativeAds.total')
      }, { 
        key: 'adultAds', 
        name: formatMessage({ id: 'app.offer.action-adultAds' }),
        visible: !!deepAt(analysis, 'adultAds.total')
      }, { 
        key: 'domainAnalysis', 
        name: formatMessage({ id: 'app.offer.action-domainAnalysis' }) 
      }
    ]
    return (
      <div className="offer-detail">
      <CountryIcon />
        <Fringe 
          selectKey="overview"
          title={deepAt(overview, 'offerName')} 
          isFollow={deepAt(overview, 'followFlag')}
          action={action} 
          onAction={this.onAction} 
          onFollow={this.onFollow}
        />
        <div className="offer-detail__content">
          <OverView 
            id="overview"
            dataSource={overview} 
            onOpenPub={this.onOpenPub}
            onOpenGEO={this.onOpenGEO}
          />
          <Crawl
            
            style={{ marginTop: 12}}    
            label={formatMessage({ id: 'app.offer.analisys.ads-label' })}
            help={formatMessage({ id: 'app.offer.analisys.ads-help' })}
            border="center"
          >
            <Crawl.Item span={4}>
              <PieChart  
                data={deepAt(analysis, 'adsSource.ratio')} 
                loading={loadingAnalysis}
              />
            </Crawl.Item>
            <Crawl.Item span={4}>
              <DoubleLine
                loading={loadingAnalysis} 
                data={deepAt(analysis, 'adsSource.trend')} 
                yAxis="Facebook"
              />
            </Crawl.Item>
          </Crawl>
          <Crawl
            border="top"
            label={formatMessage({ id: 'app.offer.analisys.geo-label'})}
            help={formatMessage({ id: 'app.offer.analisys.geo-help' })}
            more={
              <a className="crawl" onClick={this.onOpenGEO}>
              {
                formatMessage({ id: 'app.offer.more'}, {
                  total: deepAt(analysis, 'geo.total'), 
                  name: 'Geo'
                })
              }
              </a>
            }
          >
            <Crawl.Item span={4}>
              <WorldMap 
                data={deepAt(analysis, 'geo.distribute')}
                loading={loadingAnalysis}
              />
            </Crawl.Item>
            <Crawl.Item span={4}  style={{ padding: '0 12px 12px 12px'}}>
              <GeoTable
                slice={5}
                loading={loadingAnalysis} 
                dataSource={deepAt(analysis, 'geo.list')} 
                pagination={false}
              />
            </Crawl.Item>
          </Crawl>
          <Crawl
            border="top"
            label={formatMessage({ id: 'app.offer.analisys.pub-label'})}
            help={formatMessage({ id: 'app.offer.analisys.pub-help' })}
            more={
              <a className="crawl" onClick={this.onOpenPub}>
              {
                formatMessage({ id: 'app.offer.more'}, {
                  total: deepAt(analysis, 'pub.total'), 
                  name: 'Publishers'
                })
              }
              </a>
            }
          >
            <Crawl.Item span={4}>
              <OfferLine 
                isLegend={true}
                loading={loadingAnalysis}
                data={deepAt(analysis, 'pub.trend')} 
              />
            </Crawl.Item>
            <Crawl.Item span={4}>
              <PublisherTable 
                slice={5}
                dataSource={deepAt(analysis, 'pub.list')} 
              />
            </Crawl.Item>
          </Crawl>
          <Crawl
            border="top" 
            label={formatMessage({ id: 'app.offer.analisys.mp-label'})}
            help={formatMessage({ id: 'app.offer.analisys.mp-help' })}
            more={
              <a className="crawl" onClick={this.onOpenMoney}>
              {
                formatMessage({ id: 'app.offer.more'}, {
                  total: deepAt(analysis, 'moneyPage.total'), 
                  name: 'Money Pages'
                })
              }
              </a>
            }
          >
            <Crawl.Item span={8}>
              <MoneyPageTable 
                dataSource={deepAt(analysis, 'moneyPage.list')} 
                pagination={false}
              />
            </Crawl.Item>
          </Crawl>
          
          <Crawl
            id="facebookAds"
            visible={deepAt(analysis, 'fbAds.total') === 0}
            border="center"
            style={{ marginTop: 12}}    
            label={formatMessage({ id: 'app.offer.analisys.fb-label'})}
            help={formatMessage({ id: 'app.offer.analisys.fb-help' })}
            more={
              <a 
                className="crawl"
                target="__blank" 
                href={`/samples?domainName=&type=facebook&offerName=${deepAt(overview, 'offerName')}`}
              >
              {
                formatMessage({ id: 'app.offer.more'}, {
                  total: deepAt(analysis, 'fbAds.total'), 
                  name: 'Facebook Ads'
                })
              }
              </a>
            }
          >
            <Crawl.Item label="Ads Format Share" span={3}>
              <PieChart data={deepAt(analysis, 'fbAds.ratio')} />
            </Crawl.Item>
            <Crawl.Item label="Ads Format Samples" span={5}>
              <PhotoWall data={deepAt(analysis, 'fbAds.list')} />
            </Crawl.Item>
          </Crawl>
          <Crawl
            id="nativeAds"
            visible={deepAt(analysis, 'nativeAds.total') === 0}
            border="center"
            style={{ marginTop: 12}}    
            label={formatMessage({ id: 'app.offer.analisys.native-label'})}
            help={formatMessage({ id: 'app.offer.analisys.native-help' })}
            more={
              <a 
                className="crawl"
                target="__blank"
                href={`/samples?domainName=&type=native&offerName=${deepAt(overview, 'offerName')}`}
              >
              {
                formatMessage({ id: 'app.offer.more'}, {
                  total: deepAt(analysis, 'nativeAds.total'), 
                  name: 'Native Ads'
                })
              }
              </a>
            }
          >
            <Crawl.Item label="Ads Format Share" span={3}>
              <NativeAds data={deepAt(analysis, 'nativeAds.ratio')} />
            </Crawl.Item>
            <Crawl.Item label="Ads Format Samples" span={5}>
              <PhotoWall data={deepAt(analysis, 'nativeAds.list')} />
            </Crawl.Item>
          </Crawl>
          <Crawl
            id="adultAds"
            visible={deepAt(analysis, 'adultAds.total') === 0}
            border="center"
            style={{ marginTop: 12}}    
            label={formatMessage({ id: 'app.offer.analisys.adult-label'})}
            help={formatMessage({ id: 'app.offer.analisys.adult-label' })}
            more={
              <a 
                className="crawl"
                target="__blank"
                href={`/samples?domainName=&type=adult&offerName=${deepAt(overview, 'offerName')}`}
              >
              {
                formatMessage({ id: 'app.offer.more'}, {
                  total: deepAt(analysis, 'adultAds.total'), 
                  name: 'Adult Ads'
                })
              }
              </a>
            }
          >
            <Crawl.Item label="Ads Format Share" span={3}>
              <NativeAds data={deepAt(analysis, 'adultAds.ratio')} yAxis={false} seriesLabel/>
            </Crawl.Item>
            <Crawl.Item label="Ads Format Samples" span={5}>
            <PhotoWall 
              data={deepAt(analysis, 'adultAds.list')} 
              permission={deepAt(analysis, 'adultAds.ipLimitFlag')}
            />
            </Crawl.Item>
          </Crawl>
          <Crawl
            id="domainAnalysis"
            border="center"
            style={{ marginTop: 12}}    
            label={formatMessage({ id: 'app.offer.domain.index-label'})}
            help={formatMessage({ id: 'app.offer.domain.index-help' })}
          >
            <Crawl.Item span={8}>
              <DomainBasic 
                meta={deepAt(domain, 'domainIconUrl')}
                title={deepAt(domain, 'domain')}
                desc={deepAt(domain, 'desc')}
              />
            </Crawl.Item>
          </Crawl>
          <Crawl border="center">
            <Crawl.Item span={8}>
              <DomainAnalysis data={domain} style={{ paddingTop: 12 }}/>
            </Crawl.Item>
          </Crawl>
          <Crawl border="center">
            <Crawl.Item 
              span={4}
              label={formatMessage({ id: 'app.offer.domain.visits-label' })}
              help={formatMessage({ id: 'app.offer.domain.visits-help' })}
              divider
            >
              <VistisStats 
                data={deepAt(domain, 'visitTrendList')}
              />
            </Crawl.Item>
            <Crawl.Item 
              span={4}
              label={formatMessage({ id: 'app.offer.domain.country-label' })}
              help={formatMessage({ id: 'app.offer.domain.country-help' })}
            >
              <CountryRank legend={false} data={deepAt(domain, 'naturalRankingList')} />
            </Crawl.Item>
          </Crawl>
          <Crawl border="center">
            <Crawl.Item 
              span={8} 
              label={formatMessage({ id: 'app.offer.domain.refferral-label' })}
              help={formatMessage({ id: 'app.offer.domain.refferral-help' })} 
            >
              <Refferral
                RefferralData={getRefferralData(deepAt(domain, 'refferralAndOutgoing'))} 
              />
            </Crawl.Item>
          </Crawl>
        </div>
        <GeoModal ref="geoModal" />
        <MoneyPageModal ref="moneyModal"/>
        <PublisherModal ref="pubModal"/>
      </div>
    );
  }
}
