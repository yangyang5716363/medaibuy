import React from 'react'

import 'flag-icon-css/sass/flag-icon.scss'

export default ({ type }) => {
  let _type = type ? type.toLowerCase() : ''
  _type = _type === 'uk' ? 'gb' : _type
  return (
    <i className={`flag-icon flag-icon-${_type}`}/>
  )
}