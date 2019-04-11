import React, { PureComponent} from 'react'
import copy from 'copy-to-clipboard'
import withRouter from 'umi/withRouter'
import { Button, Table, Tooltip, message } from 'antd'
import _ from 'lodash'
import { download } from '@/services/ads'
const cfgs = {
  51: '/samples/detailAdult',
  52: '/samples/detailNative'
}
@withRouter
class MoneyPageTable extends PureComponent {
  constructor(props) {
    super(props)
  }
  onCopy(text) {
    copy(text)
    message.success('copy success')
  }
  onDowload(item) {
    download({ adId: item.id, type: item.adType })
  }
  generateColumns() {
    const { params} = this.props.match
    const _this = this
    return [
      { title: 'URL', dataIndex: 'url', width: 465, render(text, item) {
        return [
          (
            <Tooltip key={_.uniqueId('pageC_')} placement="right" title={text}>
              <span className="offer-widget-money__url">{text}</span>
            </Tooltip>
          ),
          (
            <span
              key={_.uniqueId('pageC_')}
              onClick={() => _this.onCopy(text)}
              className="offer-widget-money__btn"
            >
            copy
          </span>
          ),
          (
            item.downloadFlag && <span 
              key={_.uniqueId('pageC_')}
              onClick={() => _this.onDowload(item)}
              className="offer-widget-money__btn" 
            >
              Download
            </span>
          )
        ]
      }}, 
      { title: 'Ads Detail', render(item) {
        let k = `${item.adType}${item.dspAdType}`
        let path = k in cfgs ? cfgs[k] : '/samples/detail'
        return (
          <a 
            target="__blank"
            style={{ color: 'rgba(0, 153, 232, 1)' }}
            href={`${path}?adId=${item.id}&domain=${params.id}`}
          >
            View
          </a>
        )
      }}, 
      { title: 'Ads Type', dataIndex: 'type' }, 
      { title: 'Traffic Network', dataIndex: 'network' },
      { title: 'First Seen Date', dataIndex: 'firstSeenDate' },
      { title: 'Last Seen Date', dataIndex: 'lastSeenDate' },
      { title: 'Days', dataIndex: 'days' },
    ]
  }
  render() {
    const columns = this.generateColumns()
    const { dataSource, pagination } = this.props
    let data = dataSource
    if (Array.isArray(data) && data.length > 10) {
      data = dataSource.filter((d, idx) => idx < 10)
    }
    return (
      <Table
        rowKey={() => _.uniqueId('page_')} 
        columns={columns} 
        dataSource={!!pagination ? dataSource : data} 
        pagination={pagination}
      />
    )
  }
}
export default MoneyPageTable