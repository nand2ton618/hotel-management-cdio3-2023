export interface IStatusCode {
  status: number
  name: string
}

class HttpException extends Error {
  constructor(public message: string, public statusCode: IStatusCode) {
    super(message)
  }
}

export default HttpException
