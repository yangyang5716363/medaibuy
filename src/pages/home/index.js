import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-locale'
import BizIcon from '@/components/BizIcon'
import Operation from '@/components/Operation'
import Card from '@/components/Card'
import Crawl from '@/components/Crawl'
import WaterWall from '@/components/WaterWall'
import Search from '@/components/Search'
import Partition from '@/components/Partition'
import Loading from '@/components/Loading'
import ButtonGroup from '@/components/ButtonGroup'
import Selection from '@/components/Selection'
import { PieChart, HomeStacked, HomeLine, HomeGroup, RatioBar } from '@/components/Chart'

import './styles.scss'
import { Table, Skeleton} from 'antd'
const cfgs = {
  1: 1,
  2: 7,
  3: 30
}
@connect(({ home, loading }) => {
  return {
    params: home.params,
    dataSource: home.list,
    analysis: home.analysis,
    loading: !!loading.effects['home/fetch'],
    analysisLoading: !!loading.effects['home/fetchAnalysis'],
    rankLoading:!!loading.effects['home/fetchAnalysisRanking']
  };
})

export default class home extends PureComponent {
  constructor(props) {
    super(props)
    this.responseType = {
      market: 11,
      offer: 1,
      ads: 2,
      publisher: 3,
      network: 4
    }
  }
  static contextTypes = {
    childElement: PropTypes.any
  }
  onSwitch = (type, key) => {
    const { params, dispatch } = this.props
    let payload = {
      timeRange: key,
      responseType: type === 'offer'? [
        this.responseType.market,
        this.responseType.offer,
        this.responseType.ads
      ] : [
        this.responseType.publisher,
        this.responseType.network
      ]
    }
    payload.responseType = payload.responseType.join(',')

    dispatch({
      type: type === 'offer' ? 'home/fetchAnalysisOffer' : 'home/fetchAnalysisRanking',
      payload
    })
  }
  onOption = (type, key) => {
    const { params, dispatch } = this.props
    let _params = params[type]
    let payload = {
      ..._params,
      category: type === 'ranking' ?  key : undefined,
      country: type === 'offer' ? key : undefined,
      responseType: type === 'offer'? [
        this.responseType.offer,
        this.responseType.ads
      ] : [
        this.responseType.publisher,
        this.responseType.network
      ]
    }
    payload.responseType = payload.responseType.join(',')

    dispatch({
      type: type === 'offer' ? 'home/fetchAnalysisOffer' : 'home/fetchAnalysisRanking',
      payload
    })
  }
  onSearchKeyword = (keyword) => {
    const { dispatch } = this.props
    return dispatch({ type: 'home/fetchKeyWord', payload:  { keyword }})
    // return Promise.resolve([])
  }
  doLinkHomeLine = (v) => {
    const { params } = this.props
    return params.offer.country ? `/offer?country=${params.offer.country}&updateDate=${v}` 
      :`/offer?updateDate=${v}`
  }
  doLinkHomeStacked = v => {
    const { params } = this.props
    if (params.offer.timeRange) {
      let key = cfgs[params.offer.timeRange]
      let date = [
        moment().subtract(key - 1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ]  
      return `/offer?updateDate=${date.join(',')}&category=${v}`
    }
    return `/offer?category=${v}`
  }
  donLinkHomeGroup = v => {
    const { params } = this.props
    if ((params.offer.country && params.offer.timeRange)) {
      let key = cfgs[params.offer.timeRange]
      let date = [
        moment().subtract(key - 1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ]
      return `/offer?country=${params.offer.country}&updateDate=${date.join(',')}&category=${v}` 
    } else if (params.offer.country) {
      return `/offer?country=${params.offer.country}&category=${v}` 
    } else if (params.offer.timeRange) {
      let key = cfgs[params.offer.timeRange]
      let date = [
        moment().subtract(key - 1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      ]  
      return `/offer?updateDate=${date.join(',')}&category=${v}` 
    } else {
      return `/offer?category=${v}` 
    }

  }
  render() {
    // console.log(a)
    const { dataSource, analysis, loading, analysisLoading, rankLoading, params} = this.props
    const pubColumns = [
      { title: 'No', dataIndex: 'no', key: 'no' },
      { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' }, 
      { title: 'Website Category', dataIndex: 'category', key: 'category' },
      { title: 'Traffic Network', dataIndex: 'network', key: 'networkNum' },
      { title: 'Offer', dataIndex: 'offerNum', key: 'offerNum' },
      { title: 'Ads', dataIndex: 'adsNum', key: 'adsNum' },
      { title: 'Category', 
        dataIndex: 'categoryRatio', 
        key: 'categoryRatio', 
        width: 460,
        render(data) {
          return (<RatioBar data={data} />)
      }}
    ]
    const trafficColumns = [
      { title: 'No', dataIndex: 'no', key: 'no' },
      { title: 'Traffic Network', dataIndex: 'network', key: 'network' }, 
      { title: 'Traffice Category', dataIndex: 'category', key: 'category' },
      { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
      { title: 'Offer', dataIndex: 'offerNum', key: 'offerNum' },
      { title: 'Ads', dataIndex: 'adsNum', key: 'adsNum' },
      { title: 'Category', 
        dataIndex: 'categoryRatio', 
        key: 'categoryRatio', 
        width: 460,
        style: {paddingLeft: 0, paddingRight: 0},
        render(data) {
          return (<RatioBar data={data} />)
      }}
    ]
    const crawlActions = [
      { key: '2', name: 'Last 7 Days' },
      { key: '3', name: 'Last 30 Days' }
    ]

    return (
      <div className="home" id="home">
        <Search
          node={this.context.childElement} 
          onSearch={this.onSearchKeyword}
          placeholder="Enter keyword or offer name"
        />
        <Loading loading={analysisLoading} />
        <div className="home-recommend__line" data-label="Recommended Offers For You" />
        <div className="home-recommend">
          <WaterWall
            slice
            gutter={24}
            columnWidth={292}
            dataSource={dataSource}
            render={(item) => {
              return loading ? (
                <div className="home-recommend__loading">
                  <Skeleton avatar paragraph={{ rows: 6 }} active/>
                </div>
              ) :  <Card 
                  followd={false}
                  to={`/offer/${item.id}`}
                  sourceName="Ads Sources"
                  dataPool={item}
                />
            }}
          />
        </div>
        <div className="home-analysis">
          <Crawl 
            label={formatMessage({ id: 'app.home.analysis.label.index' })}
            help={formatMessage({ id: 'app.home.analysis.help.index'})}
            border="center"
            addonAfter={(
              <ButtonGroup 
                actived={params.offer.timeRange || '3'}
                option={crawlActions} 
                onSwitch={key => this.onSwitch('offer', key)}
                help={formatMessage({ id: 'app.home.analysis.date.help' })}
              />
            )}
            suffix={(
              <Selection
                option={analysis.country}
                onChange={k => this.onOption('offer', k)}
                placeholder="All GEOs"
              />
            )}
          >
            <Crawl.Item
              span={4}
              label={formatMessage({ id: 'app.home.analysis.label.trend' })} 
              help={formatMessage({ id: 'app.home.analysis.help.trends' })}
              divider
            >
              <HomeLine
                style={{ marginTop: '-30px'}}
                data={analysis.offerTrends} 
                link={this.doLinkHomeLine}
              />
            </Crawl.Item>
            <Crawl.Item 
              span={4}
              label={formatMessage({ id: 'app.home.analysis.label.market'})} 
              help={formatMessage({ id: 'app.home.analysis.help.market'})} 
            >
              <HomeStacked 
                style={{ marginTop: '-30px'}} 
                data={analysis.offerMarketShare} 
                link={this.doLinkHomeStacked}
              />
            </Crawl.Item>
          </Crawl>
          <Crawl border="center">
            <Crawl.Item 
              span={8}
              label={formatMessage({ id: 'app.home.analysis.label.adSource'})}
              help={formatMessage({id: 'app.home.analysis.help.adSource'})}
            >
              <Crawl>
                <Crawl.Item span={4}>
                  <PieChart  data={analysis.adsSourcePlat} /> 
                </Crawl.Item>
                <Crawl.Item span={4}>
                  <HomeGroup 
                    data={analysis.adsSourceCategory} 
                    link={this.donLinkHomeGroup}
                  />
                </Crawl.Item>     
              </Crawl>
            </Crawl.Item>
          </Crawl>
          <Crawl 
            label="Ranking List"
            // help={formatMessage({ id: 'app.home.analysis.help.ranking' })}
            style={{marginTop: 12 }}
            border="center"
            addonAfter={(
              <ButtonGroup 
                actived={params.ranking.timeRange || '3'}
                option={crawlActions} 
                onSwitch={key => this.onSwitch('ranking', key)}
                help={formatMessage({ id: 'app.home.analysis.date.help' })}
              />
            )}
            suffix={(
              <Selection
                onChange={k => this.onOption('ranking', k)}
                option={analysis.category}
                placeholder="All Categories"
              />
            )}
          >
            <Crawl.Item 
              span={8} 
              label={formatMessage({ id: 'app.home.analysis.label.publishers' })}
              help={formatMessage({ id: 'app.home.analysis.help.publishers'})}
              onOption={k => this.onOption(k, 'publisher')}
            >
              <Table 
                loading={rankLoading}
                columns={pubColumns} 
                dataSource={analysis.topPublisher} 
                pagination={false}
              />
            </Crawl.Item>
          </Crawl>
          <Crawl border="center">
            <Crawl.Item 
              span={8}
              label={formatMessage({ id: 'app.home.analysis.label.traffic' })}
              help={formatMessage({ id: 'app.home.analysis.help.traffic' })}
            >
              <Table
                loading={rankLoading}
                columns={trafficColumns}
                dataSource={analysis.topTrafficNetwork}
                pagination={false}
              />
            </Crawl.Item>
          </Crawl>
        </div>
      </div>
    );
  }
}
