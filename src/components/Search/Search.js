import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import { Input, Icon, Spin, Empty } from 'antd'
import Trigger from 'rc-trigger'
import './styles.scss'
export default class Search extends PureComponent {
  static defaultProps = {
    placeholder: 'Enter the domain,keyword'
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      value: props.value || null,
      option: []
    }
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps &&  nextProps.value === this.props.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  isPromise (e) {
    return !!e && typeof e.then == "function"
  }
  onSubmit = (e) =>  {
    const { onSubmit } = this.props
    const { value } = this.state
    this.c && this.c.setState({ popupVisible: false })
    onSubmit && onSubmit(value)
  }
  onSelect = (item) => {
    const { value } = this.state
    const { onSubmit } = this.props
    if (item.link) {
      window.open(`${item.link}${value}`)
    } else {
      this.setState({
        value: item.value 
      }, () => {
        onSubmit && onSubmit(item.value)
      }) 
    }

  }
  onChange = (e) => {
    let value = e.target.value
    this.setState({
      loading: true,
      value: e.target.value
    }, this.onFake)

  }
  onFake = () => {
    if (this.timer)  clearTimeout(this.timer)
    const { value } = this.state
    const { onSearch, optionLink } = this.props
    this.timer = setTimeout(() => {
      onSearch(value).then(res => {
        let option = Array.isArray(res) ? res : []
        this.setState({ option, loading: false })
      }).catch(err => {
        this.setState({ option: [], loading: false })
      })
    }, 500)
  }
  renderPopup(option, value, loading) {
    return (
      <div className="common-search__options">
        {
          loading && (
            <div className="common-search__options-loading">
              <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
            </div>
          )
        }
        {
          !loading && option.length === 0 && <p>No Data</p>
        }
        {
          !loading && option.map((item, idx) => item.link ? (
            <div
              className="common-search-link"
              key={idx}
              onClick={() => this.onSelect(item)}
            >
              <span className="common-search-link__former">
                View {item.name} with 
                <b className="common-search-highlight">{value}</b>
              </span>
              <span className="common-search-link__queen">
                <b className="common-search-highlight"> {item.value}</b>
                result have been found
              </span>
              </div>
            ): (
              <div 
                className="common-search-item"
                key={item.value} 
                onClick={() => this.onSelect(item)}
              >
                <span>{item.value}</span>
              </div>
            )
          )
        }
      </div>
    )
  }

  render() { 
    const { node, placeholder } = this.props
    const { option, value, loading, popupVisible} = this.state
    return (
      <Trigger
        alignPoint
        action={['focus']}
        popupAlign={{
          points: ['tc', 'bc']
        }}
        ref={c => this.c = c}
        popup={this.renderPopup(option, value, loading)}
      >
        <Input.Search
          className="common-search"
          placeholder={placeholder}
          size="large"
          value={value}
          onPressEnter={this.onSubmit}
          onSearch={this.onSubmit}
          onChange={this.onChange}
        />
      </Trigger>
    )
  }
}