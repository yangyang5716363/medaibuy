import React, { PureComponent } from 'react'
import BizIcon from '@/components/BizIcon'
import cs from 'classnames'
import Collection from '@/components/Collection'
import ImageType from './ImageType'
import { getURLParam } from '@/utils'
import { Tooltip } from 'antd'
import './styles.scss'

// icon 图标列表
const JoinApplications = props => {
  return props.data.map(value => (
    <div key={ value.type } className="advertising-card__icon">
      <Tooltip title={ value.title } placement="bottom">
        <BizIcon type={ value.type } />
        <span>{ value.value }</span>
      </Tooltip>
    </div>
  ))
}

const Jsx = (flag, op) => flag ? op : null

export default class extends PureComponent {
  state = {
    isCollection: false,
    isMore: false,
    collectionHide: false,
  }

  constructor (props) {
    super(props)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.searchDomain = this.searchDomain.bind(this)
    // this.collection = this.collection.bind(this)
  }

  componentDidMount () {
    this.isBlockMore()
  }

  // 收藏回调
  collection (flag) {
    this.setCollection(flag)
  }

  // 卡片名 跳转
  jump (event) {
    let title = encodeURIComponent( decodeURIComponent( event.target.innerHTML ) )
    let str = `advertisers=1&type=facebook&domainName=${title}&` // advertisers 代表广告主
    let urlObj = getURLParam()

    delete urlObj.domain
    delete urlObj.adId

    // 拼接所有 url 参数 
    for (let [key, value] of Object.entries(urlObj)) {
      str += `${key}=${value}&`
    }

    window.open(`/samples?${str.substr(0, str.length - 1)}`)
  }

  jumpName (event) {
    event.stopPropagation()
    
    // FB 广告主跳转
    if ( this.props.jumpName ) {
      this.props.jumpName(event, this.props)
    
    // FB详情跳转
    } else {
      this.jump( event )
    }
  }

  // 划过后重新展示收藏
  onMouseEnter () {
    this.setCollection(false)
  }

  onClick () {
    const { routerDetail } = this.props
    if ( routerDetail ) {
      routerDetail(this.props)
    }
  }

  // 底部 domain 链接跳转
  searchDomain (event) {
    event.stopPropagation()

    let { adId } = this.props
    let { type } = getURLParam()
    
    // 详情页 直接跳转 获取 type
    let samples = {
      '/samples/detail': 'facebook',
      '/samples/detailNative': 'native',
      '/samples/detailAdult': 'adult',
    }

    if ( !type ) {
      type = samples[location.pathname]
    }

    window.open(`/samples?type=${type}&adId=${adId}&keyword=${event.target.innerHTML}`)
  }

  // 收藏展示 或隐藏
  setCollection (hide) {
    this.setState({
      collectionHide: hide,
    })
  }

  isBlockMore () {
    // 后期用CSS解决 找到了办法 还要实践下
    const description = document.querySelector('.advertising-card__description')
    if ( !description ) return false
    const p = description.querySelector('p')

    if ( p && p.offsetHeight > 240 ) {
      p.className = 'advertising-card__maxdescription'
      this.setState({
        isMore: true,
      })
    }
  }

  render () {
    const { isMore, collectionHide } = this.state
    const { logo, logoTitle, description, images, introduction, title = '', columnWidth = 0 } = this.props
    const { applications = [], original = {}, more, collection, adId, codFlag, icon, height, width } = this.props

    return (
      <div
        onMouseEnter={ this.onMouseEnter } 
        className={ cs({ 'advertising-card': true, 'advertising-card-padding': ( original.url || original.content || original.adSourceUrl ) }) } 
        onClick={ this.onClick.bind(this) }
      >
        {/* 收藏 */}
        <div className={ cs({ 'common-collection-hide': collectionHide }) }>
          { icon && <Collection 
            collection={ collection } 
            adId={ adId } 
            icon={ icon }
            />
          }
        </div>

        {/* 头部 */}
        <div className="advertising-card__logo">
          { Jsx( logo, <img src={ logo } /> ) }
          { Jsx( logoTitle, <p onClick={ this.jumpName.bind(this) }>{ logoTitle }</p> ) }
        </div>

        {/* 描述区域 */}
        {
          description && (
            <div className="advertising-card__description">
              <p>{ description }</p>
              {
                isMore && <a href="#" className="advertising-card__more">more &gt;</a>
              }
            </div>
          )
        }
        
        {/* 图片展示区域 */}
        {
          images ? (
            <div className="advertising-card__image">
              { codFlag && <span className="cod">COD</span> }
              { ImageType[ images.type ]( images, height, columnWidth, width ) }
            </div>
          ) : (
            <div className="advertising-card__image" style={{padding: '10px'}}>
              <img src="data:image/gif;base64,R0lGODlhXgHpANU8AOjo6Ly8vOrq6unp6fLy8vHx8evr6/X19ezs7PPz8+3t7b+/v/Dw8O7u7u/v7/b29r29vfT09M/Pz8jIyMLCwuXl5dLS0r6+vtXV1dnZ2cTExMvLy93d3cDAwNzc3MzMzOfn59PT09fX19TU1OTk5MrKytjY2Nvb2+Hh4c7OzsfHx9/f38XFxebm5sPDw+Pj48HBwc3NzcnJydra2uDg4NHR0d7e3tbW1tDQ0MbGxuLi4vf39+Hh4QAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyYThiYjgzNC1kOTczLTVjNGMtOWRhNS02Nzk2Y2FiMzBlYTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDhGRDQ5RjA0RTc5MTFFODlCOUFCODBEOUYxMUM3QTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDhGRDQ5RUY0RTc5MTFFODlCOUFCODBEOUYxMUM3QTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRl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" />
            </div>
          )
        }
        
        {/* 标题 */}
        {
          getURLParam().keyword ?
            ( title && <h3 className="advertising-card__title" dangerouslySetInnerHTML={{  __html: title }} /> ) :
            ( title && <h3 className="advertising-card__title">{ title }</h3> )
        }

        {/* 标题内容 */}
        <p className="advertising-card__introduction">
          { introduction || null }
        </p>
        
        {/* Icons */}
        <div className="advertising-card__iconbox">
          <JoinApplications data={ applications } />
        </div>
        
        {/* Footer */}
        {
          ( original.url || original.content ) && (
            <div className="advertising-card__original">
              <a 
                href={ original.url } 
                target="_blank"
                onClick={ this.searchDomain }
                className={ cs({ "advertising-card__url": true, red: original.color }) }
              >
                { original.content }
              </a>
              { more && <a href="#" className="advertising-card__more">{ more }</a> }
            </div>
          )
        }
      </div>
    )
  }
}