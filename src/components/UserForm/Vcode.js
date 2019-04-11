import React, { Component } from 'react'
export default class Vcode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: `url(${this.props.url}?ram=${new Date().getTime()})`
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.randomCode !== this.props.randomCode) {
      this.setState({
        url: `url(${this.props.url}?ram=${new Date().getTime()})`
      });
    }
  }

  render() {
    const { url } = this.state;
    const { showRefresh } = this.props;
    // const newUrl = `url(${APIV}/login/getValCode?ram=${new Date().getTime()})`

    return (
      <div style={{display: 'flex', alignItems:'center'}}>
        <div
          onClick={(e) => this.setState({url: `url(${this.props.url}?ram=${new Date().getTime()})`})}
          style={{cursor:'pointer', height:'40px', lineHeight:'40px', width: '100%',border:'1px solid #d9d9d9', borderRadius: '4px',backgroundImage:url, backgroundSize: '100% 100%'}}>
        </div>

        { showRefresh ?
          <div
            style={{ marginLeft:'10px' }}
            onClick={(e) => this.setState({url: `url(${this.props.url}?ram=${new Date().getTime()})`})}>
            <i
              style={{fontSize: 20, cursor:'pointer'}}
              className="icon iconfont icon-refresh" 
            />
          </div> : null
        }
      </div>

    );
  }
}
