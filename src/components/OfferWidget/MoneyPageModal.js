import React, { PureComponent } from 'react'
import { Modal, Table, Button, message, } from 'antd'
import MoneyPageTable from './MoneyPageTable'

class MoneyPageModal extends PureComponent {
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
    const width = document.body.clientWidth - 48
    return (
      <Modal
        className="custom-modal"
        width={width}
        title="Money"
        visible={visible}
        onCancel={this.onCancel}
        footer={false}
      >
        <MoneyPageTable dataSource={dataSource} pagination={true}/>
      </Modal>
    )
  }
}
export default MoneyPageModal