import React, { PureComponent } from 'react'
import Link from 'umi/link'
import './styles.scss'
export default class Footer extends PureComponent{
  constructor(props) {
    super(props)
  }
  render(){
    const { style, footerLeft, footerRight} = this.props
    return(
      <div style={{ ...style }} className="footer">
          <span className="copyright">
            {footerLeft}
          </span>
          <span className="link">
            {
              Array.isArray(footerRight)  && footerRight.map((item, index )=> (
                <a key={index} href={item.href} target="_blank" >
                  {item.text}
                </a>
              ))
            }
          </span>
      </div>
    )
  }
}