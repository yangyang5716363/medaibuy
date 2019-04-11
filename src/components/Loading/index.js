import React, { PureComponent } from 'react'
import { Spin, Alert } from 'antd'
import './styles.scss'

export default class extends PureComponent {
  render () {
    const { loading, pageNo = 1 } = this.props
    return (
      loading && (
        <div className="common-screen-loading">
          <Spin size="large">
            {/* <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            /> */}
          </Spin>
        </div>
      )
    )
  }
}