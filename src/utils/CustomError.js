export default class CustomError extends Error {
  constructor(parameter) {
    super(parameter)
    this.code = {
      10001: 'HttpError',
      10002: 'CodeError',
      20001: 'CustomError'
    }
    if (parameter instanceof Error) {
      this.doErrorMessage(parameter)
    } else {
      this.doCustomMessage(parameter)
    }
  }
  doCustomMessage(error) {
    let code = Object.keys(error).join('')
    let message = Object.values(error).join('')
    this.code = code
    this.name = this.code[code]
    this.message = message|| 'Unknown Error'
    this.stack = 'MessageError: none'
  }

  doErrorMessage(parameter) {
    this.code = parameter.code || 10001
    this.name = this.code[10001]
    this.message = parameter.message
    this.stack = parameter.stack
  }
}
