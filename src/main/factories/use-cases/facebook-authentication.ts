import { FacebookAuthentication, setupFacebookAuthentication } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepository } from '@/main/factories/repos'
import { makeJwtTokenHandler } from '@/main/factories/crypto'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  const jwtTokenGenerator = makeJwtTokenHandler()
  const pgUserAccountRepo = makePgUserAccountRepository()
  const fbApi = makeFacebookApi()
  return setupFacebookAuthentication(fbApi, pgUserAccountRepo, jwtTokenGenerator)
}
