import React, { PureComponent } from 'react'
import BizIcon from '@/components/BizIcon'
import cs from 'classnames'
import { Spin } from 'antd'
import './styles.scss'

export default class extends PureComponent {
  render () {
    const { head, data, className } = this.props

    return (
      <table key="table" className={cs({'common-table': true}, className)}>
        {
          data && data.length && (
            <thead>
              <tr>
                <td colSpan="10">
                  <BizIcon type="history" />
                  <span>{ head ? head.label : '' }</span>
                </td>
              </tr>
            </thead>
          )
        }
        <tbody>
          {
            data && data.length ? ( data.map(({ title, content }, key) => (
              <tr key={ key }>
                <td>{ title }</td>
                <td>{ content }</td>
              </tr>
            ))) : <tr><td style={{height: '200px', 'textAlign': 'center', padding: 0}}><Spin size="default" /></td></tr>
          }
        </tbody>
      </table>
    )
  }
}