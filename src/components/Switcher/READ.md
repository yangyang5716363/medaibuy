###Switcher

```javascript
function onToggle(record) {

}
function onNotice(record) {

}
    const filterTapOption = [
      { key: '1', name: 'FaceBook', disabled: true },
      { key: '2', name: 'Native', disabled: false  },
      { key: '3', name: 'Adult', disabled: false }
    ]
    const = <Switcher 
      option={filterTapOption}
      onToggle={onToggle}
      onNotice={onNotice}
      selectKey="3"
    />
```