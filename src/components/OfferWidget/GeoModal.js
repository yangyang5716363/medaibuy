import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import GeoTable from './GeoTable'
class GeoModal extends PureComponent {
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
        title="Geo"
        className="custom-modal"
        width={960}
        visible={visible}
        onCancel={this.onCancel}
        footer={false}
      >
        <GeoTable dataSource={dataSource} pagination={true}/>
      </Modal>
    )
  }
}
export default GeoModal