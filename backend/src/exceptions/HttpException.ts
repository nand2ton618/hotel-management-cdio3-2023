export interface IStatusCode {
  status: number
  name: string
}

class HttpException extends Error {
  constructor(
    public name: string,
    public message: string,
    public statusCode: IStatusCode,
    public time?: number
  ) {
    super(message)
  }
}

export default HttpException
