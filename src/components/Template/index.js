import React, { PureComponent } from 'react';
import Link from 'umi/link';
import backgroundImage1 from '@/assets/loginBg1.png';
import backgroundImage2 from '@/assets/loginBg2.png';
import defaultLogo from '@/assets/logo.png';
import './styles.scss'
export default class Template extends PureComponent {
  constructor(props){
    super(props)
  }
  render(){
    const { logo, borderBottom,bgColor } = this.props
    return(
      <div 
        className="template"
        // style={{ backgroundImage: `url(${backgroundImage2})` }}
      >
        {/* <div
          className="template-header"
          style={{ 
            backgroundImage: `url(${backgroundImage1})`,
            borderBottom: borderBottom || '1px solid #ddd', 
            backgroundColor: bgColor 
          }}
        >
          <Link to='/'><img src={logo || defaultLogo}/></Link>
        </div> */}
        <div style={{height: 'calc(100vh - 132px)'}}>
          { this.props.children }
        </div>
      </div>
    )
  }
}