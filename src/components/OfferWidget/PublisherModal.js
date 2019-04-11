import React, { PureComponent } from 'react'
import { Modal, Table } from 'antd'
import PublisherTable from './PublisherTable'
class PublisherModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      dataSource: []
    }
  }
  setData(data) {
    this.setState({ visible: true, dataSource: data })
  }
  onCancel = () => {
    this.setState({
      visible: false,
      dataSource: []
    })
  }
  render() {
    const { dataSource, visible } = this.state
    
    return (
      <Modal
        title="Publisher"
        className="custom-modal"
        width={960}
        visible={visible}
        onCancel={this.onCancel}
        footer={false}
      >
        <PublisherTable dataSource={dataSource} pagination number/>
      </Modal>
    )
  }
}
export default PublisherModal