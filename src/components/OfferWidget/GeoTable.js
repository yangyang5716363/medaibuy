import React, { PureComponent} from 'react'
import numeral from 'numeral'
import CountryIcon from '@/components/CountryIcon'
import copy from 'copy-to-clipboard'
import { Button, Table, Tooltip, message, Progress, Badge } from 'antd'
import _ from 'lodash'

class GeoTable extends PureComponent {
  constructor(props) {
    super(props)
    this.total = 0
  }
  onCopy(text) {
    copy(text)
    message.success('copy success')
  }
  generateColumns() {
    const _this = this

    return [
      { title: 'Geo', dataIndex: 'geo', render(item, record) {
        return (
          <div>
            <span className="geo-tabel-icon">
              <CountryIcon type={record.simpleGeo}/>
            </span>
            <span className="geo-tabel-title">{item}</span>
          </div>
        )
      }}, 
      { title: 'Ads', dataIndex: 'adNum' }, 
      { title: 'Ads Share', dataIndex: 'ratio', width: 108,
        render(text) {
          // console.log('aaaa', Number(item.adNum / _this.total) * 100)
        return (
          <Progress 
            percent={text * 100} 
            showInfo={false}
            strokeColor="#0099E8"
          />
        )
      }}, 
      { title: 'Change', render(d) {
        return !!d.change === false ? '-' : (
          <Badge 
            key="ad-3"
            className="offer-detail_count" 
            count={numeral(d && d.change / 100).format('0%')} 
            style={{ backgroundColor: d && d.change > 0 ? '#00BC5E': '#EF6F6F'}} 
          />
        )
      }}
    ]
  }
  render() {
    const columns = this.generateColumns()
    const { dataSource = [], slice, pagination, ...props } = this.props

    this.total =  Array.isArray(dataSource) ? dataSource.reduce((count, item) => {
      return count + item.adNum
    }, 0) : 0
    let data = slice ? dataSource.slice(0, slice) : dataSource
    return (
      <Table
        rowKey={() => _.uniqueId('page_')} 
        columns={columns} 
        dataSource={!!pagination ? dataSource : data} 
        pagination={pagination}
        {...props}
      />
    )
  }
}
export default GeoTable