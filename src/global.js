import '@babel/polyfill'
import CustomError from './utils/CustomError'

window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log('errorMessage: ' + errorMessage); // 异常信息
  console.log('scriptURI: ' + scriptURI); // 异常文件路径
  console.log('lineNo: ' + lineNo); // 异常行号
  console.log('columnNo: ' + columnNo); // 异常列号
  console.dir(error); // 异常堆栈信息
  return true
};
window.CustomError = CustomError
