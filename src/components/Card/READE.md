##offer 卡片
```javascript
import React from 'react-dom'
ReactDOM.render(
    <Card 
      style={{ height: 297, width: 292 }}
      toTitle="/offers"
      logo="https://s3-us-west-2.amazonaws.com/imgsmt/fb/FR/20190105/49204d10-4638-3f32-aff4-e373d498e169.png_50*50"
      title="EasyParcel Malaysia"
      desc="We're bringing this great promo back. Only RM5.90 nett for parcel up to 5KG, this is test ok?"
      grid={[
        { name: 'ads', value: '123' },
        { name: 'Category', value: '123'},
        { name: 'Geo', value: '123'},
        { name: 'Update', value: '123'},
        { name: 'Engagement', value: '123'},
        { name: 'Impression', value: '123'},
        { name: 'Traffic', value: '123'},
      ]}
      sourceName="Ads Sources"
      sources={['dsp-adult', 'fb', 'dsp-native']}
    />
  , document.getElementById('example'))
 
```