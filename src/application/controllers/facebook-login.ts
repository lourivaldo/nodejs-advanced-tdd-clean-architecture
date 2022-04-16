import { HttpResponse, unathorized, ok } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { Validator, ValidatorBuilder } from '@/application/validation'
import { Controller } from '@/application/controllers'

type HttpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}

export class FacebookLoginController extends Controller {
  constructor (private readonly facebookAuth: FacebookAuthentication) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.facebookAuth.perform({ token: httpRequest.token })
    if (accessToken instanceof AccessToken) {
      return ok({
        accessToken: accessToken.value
      })
    }
    return unathorized()
  }

  override buildValidators (httpRequest: any): Validator[] {
    return [
      ...ValidatorBuilder.of({ value: httpRequest.token, fieldName: 'token' }).required().build()
    ]
  }
}
