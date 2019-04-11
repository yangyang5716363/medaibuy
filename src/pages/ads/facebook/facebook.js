import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Filter from '@/components/Filter'
import cs from 'classnames'
import { Empty, Spin } from 'antd'
import NoData from '@/components/NoData'
import AdvertisingCard from '@/components/AdvertisingCard'
import WaterWall from '@/components/WaterWall'
import NoPermission from '@/components/NoPermission/NoPermission'
import { connect } from 'dva'
import qs from 'qs'
import { getURLParam } from '@/utils'

import Partition from '@/components/Partition'
import './styles.scss'

@connect(({ ads, loading }) => {
  return {
    loading: !!loading.effects['ads/fetch'] || !!loading.effects['ads/native'],
    dataSource: ads.list,
    fbParams: ads.fbParams,
    totalCount: ads.totalCount,
    totalPages: ads.totalPages,
    facebookFilter: ads.facebookFilter, // Facebook Filter 数据
    nativeFilter: ads.nativeFilter, // Native Filter 数据
    adultFilter: ads.adultFilter, // Audlt Filter 数据
    ipLimitFlag: ads.ipLimitFlag,
    pageSum: ads.pageSum,
  }
})
export default class extends PureComponent {
  static contextTypes = {
    layoutElement: PropTypes.any
  }

  state = {
    value: {},
    scrollElement: null,
    record: '',
  }

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps (nextProps) {
    
  }

  componentDidMount() {
    // 监听 lazysizes  是否加载完
    document.addEventListener('lazybeforeunveil', (e) => {
      this.waterWall && this.waterWall.resizeLayout()
    })
  }
  
  // Filter 过滤
  onFilterChange = (record) => {
    const { dispatch, fbParams } = this.props
    dispatch({ type: 'ads/updateFbParams', payload: { ...fbParams, ...record } })
    this.setState({ record })
    this.props.sendArr.onFilterChange( record )
  }

  onSelect = (key, status) => {
    console.log('operation操作', key, status)
  }

  // 排序方法
  sortBy = (sortField, event) => {
    const { record } = this.state
    const { onSelected } = this.props
    
    onSelected({ 
        sortField,
        ...record,
        sortType: 'desc', // 默认使用 desc 排序
    })
  }
  
  render() {
    let sortFn = sortField => this.sortBy.bind(this, sortField)
    let { data = Immutable.List([]), sendArr, sortByArr } = this.props
    let { location, loading, pageSum, pageNo, ipLimitFlag } = this.props
    let { totalCount, totalPages, facebookFilter, nativeFilter, adultFilter } = this.props
    let { type, keyword, ...params } = qs.parse(location.search, { ignoreQueryPrefix: true })
    let getFilter = { // Filter 匹配列表
      facebook: facebookFilter,
      native: nativeFilter,
      adult: adultFilter,
    }

    return (
      <div className="ads-facebook js-ads-facebook">
        <div className="ads-facebook__filter">
        {/* 是否为广告主 */}
        {
          ( getURLParam().advertisers === '1' ) && (
            <div className="serach-name">
              {
                data.get(1) ? 
                  <img src={ data.get(1).logo } /> :
                  <img src={ require('@/assets/defaultOffer.png') } />
              }
              <article>
                <h4>{ decodeURIComponent( getURLParam().domainName ) }</h4>
                <span>Ads: { totalCount }</span>
              </article>
            </div>
          )
        }
          <Filter 
            dataSource={ getFilter[ getURLParam().type ] }
            onChange={ this.onFilterChange }
            value={ params }
          />
        </div>

        <div className="ads-samples__sort">
          <span>Sort by: </span>
          <ul>
            {
              ( sortByArr && sortByArr.length ) && sortByArr.map(obj => (
                <li 
                  key={ obj.key }
                  className={ cs({ 'active': obj.active }) } 
                  onClick={ sortFn( obj.key ) }
                >
                  { obj.value }
                </li>
              ))
            }
          </ul>
        </div>

        <div className="ads-facebook__list js-ads-facebook__list">
        {
          ipLimitFlag ? 
            <NoPermission
              style={{maxWidth: '300px'}}
            /> : 
            (
              ( totalPages == 0 && pageNo == 1 && !data.size ) ? (
                <div className="ads-empty-default">
                  <NoData />
                </div>

              ) : (
                <WaterWall
                  getInstance={c => this.waterWall = c}
                  gutter={24}
                  columnWidth={292}
                  dataSource={data}
                  render={(item, index, options) => {
                    return (
                      <AdvertisingCard 
                        { ...item }
                        { ...sendArr }
                        { ...options }
                      />
                    )
                  }}
                />
              )
            )
        }
        </div>

        {
          pageSum && totalCount != 0 && (
            <Partition>
              {
                ( pageSum === totalPages ) ? 
                  <p className="no-more-data">You have reached the bottom of the page, no more~</p> :
                  <Spin spinning={loading} tip="Loading More..."/>
              }
            </Partition>
          )
        }
      </div>
    );
  }
}
