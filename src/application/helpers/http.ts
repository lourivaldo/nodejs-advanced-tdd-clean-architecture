import { UnathorizedError } from '@/application/errors'

export type HttpResponse = {
  statusCode: number
  data: any
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
})

export const unathorized = (): HttpResponse => ({
  statusCode: 401,
  data: new UnathorizedError()
})
