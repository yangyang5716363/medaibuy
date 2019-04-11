import React, { PureComponent } from 'react'
import { Button, Divider, Form, } from 'antd';
import Sign from './Sign';
const FormItem = Form.Item;
export default class SecurityRow extends PureComponent{
  constructor(props){
    super(props)
  }
  render(){
    const { label, formItemLayout, desc, isSet, btntext, isRight, content, hideLine } = this.props
    return(
      <div>
        <FormItem label={label} {...formItemLayout}>
          {
            isRight ? 
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", minHeight: '50px' }}>
            <div style={{ fontSize: '14px', color: '#999', flex: 1, lineHeight: '1.8' }}>
              {desc}
            </div>
            <div style={{ width: '200px', display: 'flex', justifyContent: 'flex-end', paddingRight: '24px',}}>
              <Sign isSet={isSet} />
              <span>
                <Button
                  type="primary"
                  style={{ width: '80px', height: '24px', background: "#0099e8"}}
                  onClick={() => this.props.onBtnClick()}
                >
                {btntext}</Button>
              </span>
            </div>
          </div> : <span>{content}</span>
          }
        </FormItem>
        {
          hideLine ? null : <Divider />
        }
      </div>
    )
  }
}