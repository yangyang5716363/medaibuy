/*
 * @Author: wangjingbo 
 * @Date: 2019-03-23 15:08:24 
 * @Last Modified by: wangjingbo
 * @Last Modified time: 2019-04-11 11:17:14
 */

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Spin, Empty } from 'antd'
import NoData from '@/components/NoData'
import Search from '@/components/Search'

import Filter from '@/components/Filter'
import Operation from '@/components/Operation'
import Card from '@/components/Card'
import WaterWall from '@/components/WaterWall'
import Partition from '@/components/Partition'

import Loading from '@/components/Loading'
import Scroll from '@/utils/scroll'
import qs from 'qs'

import './styles.scss'

@connect(({ offer, loading }) => {
  return {
    total: offer.total,
    dataSource: offer.list,
    filter: offer.filter,
    loading: !!loading.effects['offer/fetch'],
  };
})
export default class extends PureComponent {
  static contextTypes = {
    childElement: PropTypes.any
  }
  constructor(props) {
    super(props)
    this.state = {
      scrollElement: null
    }
    this.pageNo = 1
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch({ type: 'offer/fetchFilter', payload: {} })
  }
  componentDidMount() {
    this.scrollPage = new Scroll(this.element, this.onNext)
  }
  onFilterChange = (record) => {
    const { history, match } = this.props
    let query = qs.stringify(record)
    history.push(`${match.path}?${query}`)
    this.pageNo = 1 // filter筛选将页码重置
  }

  onNext = () => {
    const { loading, dispatch, total, dataSource, location } = this.props
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })
    if (!loading && dataSource.size < total) {
        this.pageNo = this.pageNo + 1
        let payload = {
          ...params,
          pageNo: this.pageNo
        }
      dispatch({ type: 'offer/fetch', payload })
    }  
  }
  onSubmit = (v) => {
    console.log('fsfs', v)
    const { history, match, location } = this.props
    let params = qs.parse(location.search, { ignoreQueryPrefix: true })
    let query = {
      ...params,
      keyword: v
    }
    query = qs.stringify(query)
    history.push(`${match.path}?${query}`)
  }
  onSelect = (key, status) => {
    const {location, match, history } = this.props
    let params = qs.parse(location.search, { ignoreQueryPrefix: true })
    if (status) {
      params = {
        ...params,
        sortField: key,
        sortType: 'desc' 
      }
    }
    this.pageNo = 1  // filter筛选将页码重置
    let query = qs.stringify(params)
    history.push(`${match.path}?${query}`)
  }
  onFollow = (data, index) => {
    const { dispatch } = this.props
    dispatch({
      type: 'offer/doFollow',
      payload: { index, data }
    })
  }
  onSearchKeyword = (v) => {
    const { dispatch } = this.props
    let payload = { keyword: v }
    return dispatch({ type: 'offer/fetchKeyword', payload })
  }
  render() {
    const { dataSource, filter, location, loading, total } = this.props
    const params = qs.parse(location.search, { ignoreQueryPrefix: true })
    const cfgs = [{
      combine: true,
      cell: 1,
      label: 'Premium Search',
      option: filter
    }]
    return (
      <div className="offer-container" ref={node => this.element = node }>
        <Search
          placeholder="Enter keyword or offer name"
          node={this.context.childElement} 
          onSearch={this.onSearchKeyword}
          onSubmit={this.onSubmit}
          value={params.keyword}
        />
        <Filter 
          style={{ marginTop: 24, marginBottom: 12 }} 
          dataSource={cfgs} 
          onChange={this.onFilterChange}
          value={params}
        />
        <Operation 
          label="SortBy"
          selectKey={params.sortField || 'default'}
          option={[
            { key: 'default', name: 'Comprehensive'},
            { key: 'latest', name: 'Latest' },
            { key: 'popular', name: 'Popular' },
          ]}
          onSelect={this.onSelect}
        />
        <Loading loading={(this.pageNo === 1 && loading)} />
        <div className="offer-container__list">
          {
            !loading && dataSource.size === 0 ? (
              <NoData />
            ) : (
              <WaterWall
                gutter={24}
                columnWidth={292}
                dataSource={dataSource}
                render={(item, idx) => (
                  <Card 
                    to={`/offer/${item.id}`}
                    sourceName="Ads Sources"
                    dataPool={item}
                    onFollow={d => this.onFollow(d, idx)}
                  />
                )}
              />
            )
          }
        </div>
   
        {
          this.pageNo > 1 && total !== 0 && (
            <Partition>
              {
                dataSource.size === total
                ? (<div>You have reached the bottom of the page,no more~</div>) : 
                (
                  <Spin spinning={loading} tip="Loading More..."/>
                )
              }
              
            </Partition>
          )
        }
      </div>
    );
  }
}
