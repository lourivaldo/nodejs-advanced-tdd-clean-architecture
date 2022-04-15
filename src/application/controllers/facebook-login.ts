import { RequiredFieldError } from '@/application/errors'
import { badRequest, HttpResponse, unathorized, ok } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { serverError } from '@/application/helpers/http'

export class FacebookLoginController {
  constructor (private readonly facebookAuth: FacebookAuthentication) { }

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }
      const accessToken = await this.facebookAuth.perform({ token: httpRequest.token })
      if (accessToken instanceof AccessToken) {
        return ok({
          accessToken: accessToken.value
        })
      }
      return unathorized()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
