import React, { PureComponent } from 'react'
import copy from 'copy-to-clipboard'
import { message, Spin } from 'antd'
import { VistisStats, CountryRank, Refferral, DspAreaGraph } from '@/components/Chart'
import CommonTable from '@/components/table/table'
import GenderRatio from '@/components/Chart/GenderRatio/genderRatio'
import Circle from '@/components/Chart/Circle/circle'
import OriginURL from '@/components/OriginURL/originURL'
import Map from '@/components/Chart/Map/map'
import Crawl from '@/components/Crawl'
import BizIcon from '@/components/BizIcon'
import { deepAt } from '@/utils'
import { Carousel } from 'antd'
import SimpleEncode from '@/components/Chart/SimpleEncode/SimpleEncode'
import domainImg from '@/assets/MaskCopy.png'
import './styles.scss'

function onChange(a, b, c) {
  console.log(a, b, c);
}

export default class extends PureComponent {
  constructor (props) {
    super(props)
    this.carousel = React.createRef()
  }

  next () {
    this.carousel.current.next()
  }

  prev () {
    this.carousel.current.prev()
  }

  copy (event) {
    copy( event.target.innerHTML )
    message.success('Copy Success!');
  }

  getGeo ( WorldMapData ) {
    const next = this.next.bind(this)
    const prev = this.prev.bind(this)
    let nextBtn = null
    let prevBtn = null
    
    if ( !WorldMapData || !WorldMapData.length ) return null

    if ( WorldMapData && WorldMapData.length > 1 ) {
      prevBtn = (
        <span className="scroll__btn-left" onClick={ prev } key="prev">
          <BizIcon type="left" />
        </span>
      )

      nextBtn = (
        <span className="scroll__btn-right" onClick={ next } key="next">
          <BizIcon type="right" />
        </span>
      )
    }

    const mapList = WorldMapData => {
      return WorldMapData.map((v0, k0) => (
        <div className="map-box" key={ k0 }>
          {
            v0.map((v1, k1) => <div className="map-box-list" key={`${k1}-${k0}`} style={{ width: `${100/v0.length}%`}}><Map title='' usaJson={ v1 } key={ `${k0}-${k1}` } /></div> )
          }
        </div>
      ))
    }
 
    return ([
      prevBtn,
      (
        <Carousel afterChange={onChange} ref={ this.carousel } key="carousel">
          { mapList( WorldMapData ) }
        </Carousel>
      ),
      nextBtn
    ])
  }

  render () {
    const { 
      basicInformationData, 
      offerInformationData, 
      chatData,
      originData,
      domainData = {},
      trafficRatioData,
      geoRankData = {},
      RefferralData = {},
      circleData,
      trafficRatioListData,
      areaData,
      simpleEncodeData = '',
      WorldMapData = [],
    } = this.props

    return (
      <div className="ads-detail__table">

        <CommonTable { ...basicInformationData } />

        <CommonTable { ...offerInformationData } className='offer-information' />

        {/* <SimpleEncode /> */}

        <div className="origin-url">
          <OriginURL 
            originData={ originData } 
          />
        </div>

        <div className="area-graph">
          <Crawl 
            label="Engagement Trending"
            border="center"
          >
            <Crawl.Item span={8}>
            {
              ( areaData && areaData.displayModel === 2 ) ? (
                <DspAreaGraph 
                  data={ areaData.trendList } 
                  // 参数列表
                  paramsList={{ name: 'total', title: 'Engagement Trending' }}
                />
              ) : <div style={{ padding: '30px', textAlign: 'center' }}><Spin size="default" /></div>
            }
            </Crawl.Item>
          </Crawl>
        </div>

        {/* Advertising Analysis And Suggestion */}
        <div className="analysis-suggestio">
          <Crawl 
            label="Advertising Analysis And Suggestion"
            border="center"
          >
            <Crawl.Item span={8}>
              <div className="analysis-suggestio__box">
                <div className="age-rati">
                  <h3>Age Ratio</h3>
                  <SimpleEncode simpleEncodeData={ simpleEncodeData } />
                </div>
                <div className="gender-rati">
                  <h3>Gender Ratio</h3>
                  <GenderRatio chatData={chatData} />
                </div>
              </div>

              <div className="analysis-suggestio__top">
                <div className="geo-distributio">
                  <div className="geo-distributio__map">
                    <h3>Geo Distribution</h3>
                    {
                      this.getGeo( WorldMapData )
                    }
                  </div>
                </div>
                <div className="interest-istributio">
                  <h3>Interest Distribution</h3>
                  <Circle circleData={ circleData } />
                </div>
              </div>
            </Crawl.Item>
          </Crawl>
        </div>

        {/* Advertiser Domain Analysis */}
        <div className="advertiser-domain">
          <h3 className="title">Advertiser Domain Analysis</h3>
          {
            ( domainData && domainData.data ) && (
              <div className="advertiser-domain__box">
                <img src={ domainData.data.image || domainImg } />

                <div className="advertiser-domain__content">
                  <h4>{ domainData.data.title }</h4>
                  <p>{ domainData.data.content }</p>
                </div>
              </div>
            )
          }

          <ul>
            {
              domainData && domainData.geo.length && domainData.geo.map((value, key) => {
                return (
                  <li key={key}>
                    <h4>{ value.count }</h4>
                    {
                      value.description === 'Country Rank' ? 
                        <p>
                          {
                            value.type ? [
                              <span className={ `flag-icon flag-icon-${value.type}` } style={{marginRight: '5px'}}></span>,
                              value.description
                            ] : value.description
                          }
                          </p> :
                        <p><BizIcon type={ value.type } /> { value.description }</p>
                    }
                  </li>
                )
              })
            }
          </ul>
       
        </div>
        
        {/* ads-detail__chars */}
        <div className="ads-detail__chars">
          <article>
            <Crawl
              id="overview"
              label="Visits Stats"
              help="Website visits for the last 6 months. Each visit is recored. If the same visitor open the."
            >
              <Crawl.Item span={8}>
                <VistisStats 
                  data={deepAt(trafficRatioData.data, 'visitTrendList')}
                  style={{height: '320px', margin: '-20px 0 0 0'}}
                />
              </Crawl.Item>
            </Crawl>
          </article>
          {/* <article>
            <span className="title-h3">Visits Stats</span>
            <div className="visits-stats">
              <VistisStats 
                data={deepAt(trafficRatioData.data, 'visitTrendList')}
              />
            </div>
          </article> */}
          
          <article>
          <Crawl
            id="overview"
            label="Geo Rank"
            help="Rank of the countries brough the most traffics to the website."
          >
            <Crawl.Item span={8}>
              <CountryRank 
                legend={false} 
                style={{height: '320px', margin: '-20px 0 0 0'}}
                data={deepAt(geoRankData.data, 'naturalRankingList')} 
              />
            </Crawl.Item>
          </Crawl>
            {/* <span className="title-h3">Geo Rank</span>
            <div className="geo-rank">
              <CountryRank legend={false} data={deepAt(geoRankData.data, 'naturalRankingList')} />
            </div> */}
          </article>
        </div>

        {/* Traffic Sources */}
        <div className="traffic-ources">
          <Crawl
            id="overview"
            label="Traffic Sources"
            help="Traffic Sources:Proportion of the major traffic resources in the PC end."
          >
            <Crawl.Item span={8}>
              {
                trafficRatioListData && 
                  <CountryRank 
                    legend={false} 
                    style={{height: '320px', margin: '-20px 0 0 0'}}
                    data={ deepAt( trafficRatioListData.data, 'trafficSourceList' ) } 
                  />
              }
            </Crawl.Item>
          </Crawl>
          {/* <span className="title-h3">Traffic Sources</span>
            {
              <CountryRank legend={false} data={deepAt(trafficRatioListData.data, 'trafficSourceList')} />
            } */}
        </div>

        {/* Refferral/Outgoing Links */}
        <div className="refferral-outgoing-links">
          <Crawl
            id="overview"
            label="Refferral/Outgoing Links"
            help="The traffic referral links and outgoing links of the website."
          >
            <Crawl.Item span={8}>
              <article>
                <Refferral RefferralData={ RefferralData ? RefferralData : {} } />
              </article>
            </Crawl.Item>
          </Crawl>
        </div>
      </div>
    )
  }
}