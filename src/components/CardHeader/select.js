import React, { PureComponent } from 'react'
import { Button, Dropdown, Menu, Icon } from 'antd';

export default class extends PureComponent {
  state = {
    buttonTxt: '',
  }
  
  constructor(props) {
    super(props)
    this.handleMenuClick = this.handleMenuClick.bind( this )
  }

  componentDidMount () {
    this.setButton( this.props.copywriting )
  }

  handleMenuClick (event) {
    const { onSelectClick } = this.props
    this.setButton(event.domEvent.target.innerHTML)
    onSelectClick && onSelectClick(event)
  }

  // 设置button文案
  setButton (text) {
    this.setState({
      buttonTxt: text
    })
  }

  // 生成 menu 列表
  getMenuList () {
    const { data } = this.props

    return (
      <Menu >
        { 
          data.map(value => 
            <Menu.Item key={ value.key } onClick={ this.handleMenuClick }>
              { value.value }
            </Menu.Item>
          )
        }
      </Menu>
    )
  }

  render () {
    const { buttonTxt } = this.state
    const menu = this.getMenuList()

    if ( buttonTxt ) {
      return (
        <div className="page-header__select">
          <Dropdown overlay={ menu }>
            <Button style={{ marginLeft: 8 }}>
              { buttonTxt } <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
      )

    } else {
      return null
    }
  }
}