import { message } from 'antd'
import socket from '@/utils/socket.plugin.js'
import router from 'umi/router'

export default function (e, dispatch) {
  console.dir(e)
  e.preventDefault()
  switch (e.code) {
    case '401':
      window.REQUEST_LIST.forEach(item => item.cancel())
      window.REQUEST_LIST = []
      message.config({
        maxCount: 1,
      });
      message.warning('Login failure')
      router.push('/user/login')
      break
    case '10001': 
      console.log(e.message)
      break
    default:
     
      message.error(e.message)
      break
  }
}