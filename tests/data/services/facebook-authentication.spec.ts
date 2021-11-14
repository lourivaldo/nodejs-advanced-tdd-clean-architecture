import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApi } from '../../../src/data/contracts/apis/facebook'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let sut: FacebookAuthenticationService
  const token = 'working_token'

  beforeEach(() => {
    loadFacebookUserApi = mock()
    sut = new FacebookAuthenticationService(loadFacebookUserApi)
  })

  it('Should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
