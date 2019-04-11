
function socketMiddleware() {
  console.log('***', 111)
  return ({ dispatch, getState }) => {
    
    return next => action => {
      
      return next(action)
    }
  }
}
export default function createSocket() {
  return {
    onAction: [socketMiddleware]
  }
}