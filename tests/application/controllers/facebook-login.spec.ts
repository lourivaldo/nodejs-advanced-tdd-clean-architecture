import { mock, MockProxy } from 'jest-mock-extended'
import { FacebookAuthentication } from '@/domain/features/facebook-authentication'
import { AuthenticationError } from '@/domain/errors/authentication'
import { AccessToken } from '@/domain/models'
import { FacebookLoginController } from '@/application/controllers'
import { ServerError, UnathorizedError } from '@/application/errors'
import { mocked } from 'ts-jest/utils'
import { RequiredStringValidator } from '@/application/validation'

jest.mock('@/application/validation/required-string')

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController
  let facebookAuth: MockProxy<FacebookAuthentication>
  let token: string

  beforeAll(() => {
    facebookAuth = mock()
    facebookAuth.perform.mockResolvedValue(new AccessToken('any_value'))
    token = 'any_token'
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  it('Should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const RequiredStringValidatorSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValue(error)
    }))
    mocked(RequiredStringValidator).mockImplementationOnce(RequiredStringValidatorSpy)

    const httpResponse = await sut.handle({ token })

    expect(RequiredStringValidatorSpy).toHaveBeenCalledWith('any_token', 'token')
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('Should call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token })

    expect(facebookAuth.perform).toHaveBeenCalledWith({ token })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })

  it('Should return 401 if authentication fails', async () => {
    facebookAuth.perform.mockResolvedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnathorizedError()
    })
  })

  it('Should return 200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_value'
      }
    })
  })

  it('Should return 500 if authentication throws', async () => {
    const error = new Error('infra_error')
    facebookAuth.perform.mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})
