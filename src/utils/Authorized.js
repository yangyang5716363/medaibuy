import React from 'react'
import Redirect from 'umi/redirect'
import { Base64 } from 'js-base64'

export default function (props) {
  if (localStorage.getItem('authorization')) {
    return props.children
  } else {
    return <Redirect to="/user/login" />
  }
}