import { HttpResponse, unauthorized, ok } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/entities'
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

  async perform ({ token }: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.facebookAuth.perform({ token })
    if (accessToken instanceof AccessToken) {
      return ok({
        accessToken: accessToken.value
      })
    }
    return unauthorized()
  }

  override buildValidators ({ token }: any): Validator[] {
    return [
      ...ValidatorBuilder.of({ value: token, fieldName: 'token' }).required().build()
    ]
  }
}
