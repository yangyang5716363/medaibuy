/*
 * @Author: wangjingbo 
 * @Date: 2019-03-23 15:08:48 
 * @Last Modified by: wangjingbo
 * @Last Modified time: 2019-04-07 19:54:01
 */

export default class Scroll {
  constructor(element, onNextPage) { 
    this.onScroll = this.onScroll.bind(this)
    if (element) {
      this.element = document.getElementById('primaryLayout') || element
      this.onNextPage = onNextPage
      this.element.addEventListener('scroll', this.onScroll)
    }
  }
  onScroll() {
    let { scrollHeight, scrollTop, clientHeight } = this.element
    if (scrollHeight <= scrollTop + clientHeight) {
      typeof this.onNextPage === 'function' && this.onNextPage()
    }
  }
  onDetach(element, cb = () => {} ) {
    element.removeEventListener('scroll', cb)
  }
}