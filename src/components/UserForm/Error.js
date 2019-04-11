import React from 'react';
export default class Error extends React.Component {
  render() {
    const { errMsg, hasError, dispatch } = this.props;

    return hasError ? (
      <div
        style={{
          marginBottom: '30px',
          color: '#86181d',
          height: '50px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          borderRadius: '5px',
          border: '1px solid rgba(27,31,35,0.15)',
          backgroundColor: '#ffdce0',
        }}
      >
       
        <div>
          {errMsg}
        </div>
        <div onClick={() => dispatch({
          type: 'user/updateState',
          payload: {
            hasLoginError: false,
          },
        })}
        >
          <div>
            <i
              className="icon iconfont icon-close"
              style={{ fontSize: 20, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    ) : null;
  }
}