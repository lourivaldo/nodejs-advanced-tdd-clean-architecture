import { LoadFacebookUser, TokenGenerator } from '@/domain/contracts/gateways'
import { SaveFacebookAccount, LoadUserAccount } from '@/domain/contracts/repositories'
import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'

type Setup = (
  facebook: LoadFacebookUser,
  userAccountRepository: LoadUserAccount & SaveFacebookAccount,
  token: TokenGenerator
) => FacebookAuthentication
type Input = { token: string }
type Output = { accessToken: string }
export type FacebookAuthentication = (input: Input) => Promise<Output>

export const setupFacebookAuthentication: Setup = (facebook, userAccountRepository, token) => {
  return async input => {
    const fbData = await facebook.loadUser(input)
    if (fbData !== undefined) {
      const accountData = await userAccountRepository.load({ email: fbData.email })
      const facebookAccount = new FacebookAccount(fbData, accountData)
      const { id } = await userAccountRepository.saveWithFacebook(facebookAccount)
      const accessToken = await token.generate({ key: id, expirationInMs: AccessToken.expirationInMs })
      return { accessToken }
    }
    throw new AuthenticationError()
  }
}
