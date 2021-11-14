import { mock, MockProxy } from 'jest-mock-extended'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '@/data/contracts/repositories'

describe('FacebookAuthenticationService', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let userAccountRepository: MockProxy<LoadUserAccountRepository & CreateFacebookAccountRepository>

  let sut: FacebookAuthenticationService
  const token = 'working_token'

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    userAccountRepository = mock()
    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepository
    )
  })

  it('Should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })

  it('Should call LoadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })

    expect(userAccountRepository.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(userAccountRepository.load).toHaveBeenCalledTimes(1)
  })

  it('Should call CreateUserAccountRepo when LoadUserAccountRepo returns undefined', async () => {
    userAccountRepository.load.mockResolvedValueOnce(undefined)

    await sut.perform({ token })

    expect(userAccountRepository.createFromFacebook).toHaveBeenCalledWith({
      email: 'any_fb_email',
      name: 'any_fb_name',
      facebookId: 'any_fb_id'
    })
    expect(userAccountRepository.createFromFacebook).toHaveBeenCalledTimes(1)
  })
})
