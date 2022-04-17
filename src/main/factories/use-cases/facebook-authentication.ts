import { FacebookAuthentication, setupFacebookAuthentication } from '@/domain/use-cases'
import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepository } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  const jwtTokenGenerator = makeJwtTokenGenerator()
  const pgUserAccountRepo = makePgUserAccountRepository()
  const fbApi = makeFacebookApi()
  return setupFacebookAuthentication(fbApi, pgUserAccountRepo, jwtTokenGenerator)
}
