import { FacebookLoginController } from '@/application/controllers'
import { makeFacebookAuthenticationService } from '@/main/factories/services'

export const makeFacebookLoginController = (): FacebookLoginController => {
  const fbAuthService = makeFacebookAuthenticationService()
  return new FacebookLoginController(fbAuthService)
}
