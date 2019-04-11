import React, { Component } from 'react';
import { connect } from 'dva';
// import numeral from 'numeral';
import _ from 'lodash';
import { Icon, List, Card, Row, Col } from 'antd';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment'
import './styles.scss';
import noData1 from '@/assets/1.png';
import noData2 from '@/assets/2.png';
import noData3 from '@/assets/3.png';

const searchTypes = {
  1: 'Social ads',
  2: 'Display ads',
  3: 'Search ads',
};

@connect(({ dashboard }) => ({
  dashboard,
}))
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { dashboard } = this.props;
    const { queryThreeMonthsLatelyCollectMessage, queryLatestSearchHistory, 
      queryCollectList 
    } = dashboard;
    console.log(queryCollectList)
    const grid = { xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 8 };
    const latestSearchHistory = () => {
      const arr = queryLatestSearchHistory.map((item) => {
        const link = item.searchType === 1 ? `/findIdvert/index?domain=${item.search}` :
          item.searchType === 2 ? `/findIdvert/displayAds?domain=${item.search}` :
            `/searchAds/index?domain=${item.search}`;
        return (
          <List.Item className="historyItem" key={`${item.id}${Math.random()}*19`}>
            <List.Item.Meta title={<a href='javascript:;' onClick={()=>this.props.dispatch(routerRedux.push(link))}>{item.search}</a>} />
            <div>{searchTypes[item.searchType]}</div>
          </List.Item>
        );
      });
      return arr;
    };

    const collectList = () => {
      const arr = queryCollectList.map((item) => {
        switch (item.collectType) {
          case 1: // website
            return !item.websiteBaseVo ? null : (
              <List.Item key={`${item.id}${Math.random()}*100`}>
                <List.Item.Meta
                  title={
                    <div>
                      You've added <Link to={`/home`}>{item.websiteBaseVo.domain}</Link> to your favourtie
                    </div>
                            }
                  description={
                    <div className="infosCardAds">
                      <dl>
                        <dt>
                          <img src={item.websiteBaseVo.domainIconUrl} alt={item.websiteBaseVo.domain} />
                        </dt>
                        <dd>
                          <Icon type="global green" /> 
                          {/* {numeral(item.websiteBaseVo.worldRanking).format('0,0')} */}
                          {item.websiteBaseVo.worldRanking}
                        </dd>
                        <dd>
                          <i className={`sem-${item.websiteBaseVo.countryCode && item.websiteBaseVo.countryCode.toLowerCase()}`} /> 
                          {/* {numeral(item.websiteBaseVo.naturalRanking).format('0,0')} */}
                          {item.websiteBaseVo.naturalRanking}
                        </dd>
                        <dd>
                          <i className="icon iconfont icon-barschart blue" />
                          {/* {numeral(item.websiteBaseVo.monthlyVisit).format('0,0.00')} */}
                          {item.websiteBaseVo.monthlyVisit}
                        </dd>
                      </dl>
                    </div>
                  }
                />
              </List.Item>
            );
          case 2: // ad
            return !item.adVo ? null : (
              <List.Item key={`${item.id}${Math.random()*10}`}>
                <List.Item.Meta
                  title={
                    <div>
                      You've added <Link to={`/home`}>{item.adVo.advertiserVO.domain}</Link> to your favourtie
                    </div>
                            }
                  description={
                    <div className="infosCardAds">
                      <dl>
                        <dt>
                          <img src={item.adVo.adInfoVO[0].url} alt={item.adVo.adInfoVO[0].title} />
                        </dt>
                        <dd>
                          <i className="icon iconfont icon-image-size" style={{ color: '#777' }} />
                          {item.adVo.adInfoVO[0].picWidth || '0'} x {item.adVo.adInfoVO[0].picHeight || '0'}
                        </dd>
                      </dl>
                    </div>
                  }
                />
              </List.Item>
            );
          default:
            return null;
        }
      });
      return arr.filter(item => item !== null);
    };
    const threeMonthsLatelyCollectMessage = () => {
      const arr = queryThreeMonthsLatelyCollectMessage.map((item) => {
        const endValue = item.type === 1 ? item.newAdCount : item.newFlowValue;
        const startValue = item.type === 1 ? item.oldAdCount : item.oldFlowValue;
        return (
          <List.Item className="messageItem" key={`${item.id}${Math.random()}`}>
            <List.Item.Meta
              title={
                <div>
                  {item.type === 1 ? 'The total ads' : 'The Paid Traffice'} from <Link to={`/findIdvert/index?domain=${item.domain}`}>{item.domain}</Link> {item.amplitudeType === 1 ? 'increased' : 'decreased'}
                  ：from 
                  {/* {numeral(startValue).format('0,0.00')}  */}
                  {startValue} 
                  to 
                  {/* {numeral(endValue).format('0,0.00')} */}
                  {endValue}
                  <span
                    className={item.amplitudeType === 1 ? "numup" : "numdown"}
                  >
                    ({item.amplitudeType === 1 ? (<Icon type="arrow-up" />) : (<Icon type="arrow-down" />)}{(item.changeValueRate * 100).toFixed(2)}%)
                  </span>
                </div>
              }
              description={<div><Icon type="clock-circle-o" /> {moment(item.createDate).format('YYYY-MM-DD')}</div>}
            />
          </List.Item>
        );
      });
      return arr;
    };
    return (
      <div className="usercenter">
        <div className="usercenter-header">Dashboard</div>
        <div className="dashboard">
          <div className="infosCardContainer">
            <div className="infosCardCenter">
              <Row style={{ padding: '0 10px' }}>
                <Col span={8}>
                  <Card className="infosCardItem" title={<span><i className="icon iconfont icon-bell" /> Messages</span>} >
                    <div className="infosCardContent">
                      {
                      queryThreeMonthsLatelyCollectMessage.length > 0 ? (
                        <List >
                          {threeMonthsLatelyCollectMessage()}
                        </List>
                      ) : (
                        <div className="noData" style={{ backgroundImage: `url(${noData1})` }}>
                          No Messages
                        </div>
                        )
                      }
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="infosCardItem" title={<span><Icon type="star-o" /> Favorites</span>} extra={<Link to="/account/favorites"><Icon type="right" /></Link>}>
                    <div className="infosCardContent favorites">
                      {
                        queryCollectList.length > 0 ? (
                          <List >
                            {collectList()}
                          </List>
                        ) : (
                          <div className="noData" style={{ backgroundImage: `url(${noData2})` }} >
                          Add domains to your favourite~ apple.com、amazon.com、google.com
                          </div>
                          )
                      }
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="infosCardItem" title={<span><i className="icon iconfont icon-history" /> History</span>}>
                    <div className="infosCardContent">
                      {
                      queryLatestSearchHistory.length > 0 ? (
                        <List >
                          {latestSearchHistory()}
                        </List>
                      ) : (<div className="noData" style={{ backgroundImage: `url(${noData3})` }} >No History </div>)
                      }
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
