/*
 * @Author: wangjingbo 
 * @Date: 2019-03-23 15:08:24 
 * @Last Modified by: wangjingbo
 * @Last Modified time: 2019-03-25 15:06:18
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Spin } from 'antd'
import Card from '@/components/Card'
import NoData from '@/components/NoData'
import WaterWall from '@/components/WaterWall'
import Partition from '@/components/Partition'
import Scroll from '@/utils/scroll'

import './styles.scss'

@connect(({ dashboard, loading }) => {
  return {
    dataSource: dashboard.OfferList,
    updateParams: dashboard.updateParams,
    loading: !!loading.effects['dashboard/collectListOffer'] || !!loading.effects['dashboard/collectList'],
  };
})
export default class Offers extends PureComponent {
  static contextTypes = {
    layoutElement: PropTypes.any
  }
  constructor(props) {
    super(props)
    this.state = {
      scrollElement: null,
      offerfetchEnd: true
    }
  }
  componentDidMount() {
    this.scrollPage = new Scroll(this.element, this.onNext)
  }

  onNext = () => {
    // const { loading, updateParams, dispatch, dataSource } = this.props
    // if (!loading && dataSource.size < updateParams.totalCount) {
    //   let payload = {
    //     ...updateParams,
    //     pageNo: updateParams.pageNo + 1
    //   }
    //   dispatch({ type: 'dashboard/collectListOffer', payload })
    // }  
  }
  onFollow = (index, data) => {
    const { dispatch } = this.props
    dispatch({
      type: 'dashboard/collectCancel',
      payload: { index, data, type: 'offers'  }
    })
  }
  render() {
    const { dataSource, loading, updateParams } = this.props
    console.log(dataSource)
    return (
      <div className="offer-container" ref={node => this.element = node } style={{ padding: "40px 0"}}>
        <Spin spinning={loading} tip="Loading..."/>
        <div className="offer-container__list" >
          {
            !loading && dataSource.size === 0 ? (
              <NoData />
            ) : (
              <WaterWall
                gutter={24}
                columnWidth={292}
                dataSource={dataSource}
                render={(item, index) => {
                  return (
                    <Card 
                      to={`/offer/detail?id=${item.id}`}
                      sourceName="Ads Sources"
                      onFollow={(data) => this.onFollow(index, data)}
                      dataPool={item}
                    />
                  )
                }}
              />
            )
          }
        </div>
        {
          updateParams.pageNo >= 1 && updateParams.totalCount !== 0 && (
            <Partition>
              {
                dataSource.size === updateParams.totalCount 
                ? (<div>没有更多数据</div>) : 
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
