import React, { PureComponent} from 'react'
import numeral from 'numeral'
import copy from 'copy-to-clipboard'
import { Button, Table, Tooltip, message, Progress, Badge } from 'antd'
import _ from 'lodash'

class GeoTable extends PureComponent {
  constructor(props) {
    super(props)
    this.total = 0
  }

  generateColumns(args = []) {
    return [
      ...args, 
      { title: 'Publisher',dataIndex: 'pub' }, 
      { title: 'Website Category', dataIndex: 'category' },
      { title: 'First Seen Date', dataIndex: 'firstSeenDate' },
      { title: 'Last Seen Date', dataIndex: 'lastSeenDate'},
      { title: 'Traffic Network', dataIndex: 'network', render(d) {
        return Array.isArray(d) ? d.join('/') : d || '-'
      }}
    ]
  }
  render() {
   
    const { dataSource = [], pagination, slice, number, ...props } = this.props
    let args = number ? [{ title: 'No', dataIndex: 'no' }] : []
    const columns = this.generateColumns(args)
    let _data = slice ? dataSource.slice(0, slice) : dataSource
    return (
      <Table 
        rowKey={() => _.uniqueId('pub_')}
        dataSource={_data} 
        columns={columns} 
        pagination={!!pagination}
      />
    )
  }
}
export default GeoTable