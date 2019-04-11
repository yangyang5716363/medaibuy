
function convert(rawData, omitted = []) {
  return Object.keys(rawData).reduce((obj, key) => {
    let item = rawData[key]
    if ( item instanceof Array) {
      return { 
        ...obj, 
        [key]: !omitted.includes(key) ? item.map(d => {
          if ('key' in d && 'value' in d) {
            return 'type' in d ? { x: d.key, y: d.value, s: d.type } : { x: d.key, y: d.value }
          } 
          return d
        }) : item
      }
    } else if (item instanceof Object) {
      return { ...obj, [key]: convert(item) }
    } else {
      return { ...obj, [key]: item }
    }
  }, {})
}
export default convert