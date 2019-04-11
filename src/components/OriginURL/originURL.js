import React, { PureComponent } from 'react'
import cs from 'classnames'
import { message } from 'antd'
import copy from 'copy-to-clipboard'
import { download } from '@/services/ads'
import { Spin, Select } from 'antd'
import './styles.scss'

export default class extends PureComponent {
  state = {
    OutgoingLinks: null,
    outgoingHide: false,
  }

  constructor (props) {
    super(props)
    this.urlObj = {}
    this.selectValue = ''
    this.navs = {
      'facebook': 4, 
      'native': 5, 
      'adult': 5
    }
  }

  componentWillMount () {
    this.getURLParam()
  }

  copy (event) {
    copy( event.target.parentNode.querySelector('strong').innerHTML )
    message.success('Copy Success!')
  }

  selectCopy () {
    const { MoneyPage } = this.props.originData
    copy( this.selectValue || MoneyPage.OutgoingLinks[0].url )
    message.success('Copy Success!')
  }

  outgoing () {
    this.setState({
      outgoingHide: !this.state.outgoingHide
    })
  }

  tabRedirect (key) {
    this.props.setOutgoingLinks(key)
  }

  download (id) {
    const type = {
      '/samples/detail': 4,
      '/samples/detailNative': 5,
      '/samples/adultNative': 5
    }
    this.getURLParam()
    download({ adId: id, type: type[location.pathname] })
  }

  handleChange (value) {
    this.selectValue = value
  }

  // FB 列表
  FB () {
    const { originData } = this.props
    const { MoneyPage = {}, OfferPage = {} } = originData

    return (
      <article>
        {
          ( originData && originData.url ) ? (
            <div className="original-ads-url">
              <h3 className="title-h3">Original Ads URL</h3>
              <p className="common-url__origin">
                <strong>{ originData.url }</strong>
                <span onClick={ this.copy.bind(this) } className="copy">Copy</span>
              </p>
            </div>
          ) : null
        }

        {
          ( MoneyPage && MoneyPage.url ) ? (
            <div className="money-page">
              <h3 className="title-h3">Money Page</h3>
              <div>
                <p className="common-url__origin">
                  {
                    [
                      <strong key="1">{ MoneyPage.url }</strong>,
                      <span key="2" onClick={ this.copy.bind(this) } className="copy">Copy</span>,
                      MoneyPage.dowloadFlag && <span key="3" className="download" onClick={ this.download.bind(this, MoneyPage.id) }>Download</span>,
                    ]
                  }
                </p>
              </div>
            </div>
          ) : null
        }

        {
          ( MoneyPage && MoneyPage.redirect && MoneyPage.redirect.length ) ? (
            <div className="redirect">
              <h3 className="title-h3">Redirect</h3>
              <div>
                <ul>
                  {
                    MoneyPage.redirect.map((v, k) => (
                      <li key={ k }>
                        <strong>{ v.url }</strong>
                        <span onClick={ this.copy.bind(this) } className="copy">Copy</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          ) : null
        }

        {
          (OfferPage && OfferPage.url) ? (
            <div className="offer-page">
              <h3 className="title-h3">Offer Page</h3>
              <div>
                  <p className="common-url__origin">
                    <strong>{ OfferPage.url }</strong>
                    <span onClick={ this.copy.bind(this) } className="copy">Copy</span>
                  </p>
              </div>
            </div>
          ) : null
        }
      </article>
    )
  }

  // DSP 列表
  DSP () {
    const { OrigiRedirect = [], MoneyPage = {}, OfferPage = {} } = this.props.originData
    const { outgoingHide } = this.state
    const Option = Select.Option

    return (
      <article>
        {
          ( OrigiRedirect && OrigiRedirect.length ) ? (
            <div className="redirect">
              <h3 className="title-h3">Redirect</h3>
              <ul>
                {
                  OrigiRedirect.map((v, k) => (
                    <li key={ k }>
                      <strong>{ v.url }</strong>
                      <span onClick={ this.copy.bind(this) } className="copy">Copy</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          ) : null
        }

        {
          ( MoneyPage && MoneyPage.url ) ? (
            <div className="money-page">
              <h3 className="title-h3">Money Page</h3>
              <p className="common-url__origin">
                {
                  [
                    <strong key="1">{ MoneyPage.url }</strong>,
                    <span key="2" onClick={ this.copy.bind(this) } className="copy">Copy</span>,
                    MoneyPage.dowloadFlag && <span key="3" onClick={ this.download.bind(this, MoneyPage.id) } className="download">Download</span>
                  ]
                }
              </p>
            </div>
          ) : null
        }
        
        {
          ( MoneyPage && MoneyPage.OutgoingLinks && MoneyPage.OutgoingLinks.length ) ? (
            <div className={cs({'redirect outgoing-links-box': true, 'outgoing-hidden': outgoingHide})}>
              <h3 onClick={ this.outgoing.bind(this) } className="title-h3">
                Outgoing Links
              </h3>

              <div className="select">
                <Select
                  onChange={ this.handleChange.bind(this) }
                  style={{ width: '90%' }} 
                  defaultValue={ MoneyPage.OutgoingLinks[0].url }
                >
                  {
                    MoneyPage.OutgoingLinks &&
                      MoneyPage.OutgoingLinks.map((v, k) =>(
                        <Option key={ k } value={ v.url } onClick={ this.tabRedirect.bind(this, k) } >
                          { v.url }
                        </Option>
                      ))
                  }
                </Select>
                <span onClick={ this.selectCopy.bind(this) } className="copy">Copy</span>
              </div>
            </div>
          ) : null
        }

        { this.getOutgoingLinks() }
        
        {
          ( OfferPage && OfferPage.url ) ? (
            <div className="offer-page">
              <h3 className="title-h3">Offer Page</h3>
            
              <p className="common-url__origin">
                {
                  [
                    <strong key="1">{ OfferPage.url }</strong>,
                    <span key="2" onClick={ this.copy.bind(this) } className="copy">Copy</span>
                  ]
                }
              </p>
            </div>
          ) : null
        }
      </article>
    )
  }

  getOutgoingLinks () {
    const { MoneyPageUrl } = this.props

    return (
      ( MoneyPageUrl && MoneyPageUrl.length ) ? (
        <div className="redirect">
          <h3 className="title-h3">Redirect</h3>
          <ul>
            {
              MoneyPageUrl.map((v, k) => (
                <li key={ k }>
                  <strong>{ v }</strong>
                  <span onClick={ this.copy.bind(this) } className="copy">Copy</span>
                </li>
              ))
            }
          </ul>
        </div>
      ) : null
    )
  }
  
  // URL 参数列表
  getURLParam () {
    const urls = location.search.replace('?', '')
    urls.split('&').forEach(value => 
      this.urlObj[value.split('=')[0]] = value.split('=')[1]
    )
  }

  render () {
    const { originData } = this.props
    const defaultSpin = <div style={{ padding: '30px', textAlign: 'center' }}><Spin size="default" /></div>

    return (
      <div className="common-url">
        {
          location.pathname === '/samples/detail' ?
          <div className="fb">{ originData ? this.FB() : defaultSpin }</div> : 
          <div className="dsp">{ originData ? this.DSP() : defaultSpin }</div> 
        }
      </div>
    )
  }
}