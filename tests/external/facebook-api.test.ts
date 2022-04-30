import { FacebookApi } from '@/infra/gateways/facebook'
import { AxiosHttpClient } from '@/infra/http/axios-client'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAaA5UXMH5YBAPPl0nG8jns6DrFj6yoUCdx23rs7HeXoZBc8MfEWjUnHHIPjgGZB0K8LvxNBCP7suvtRwon9gUuM3x3KbLPqB3X9nVpNriVAZCB5Wq2EmLHrtBtM0jjMZCqj7twVpYdX5BRpCZAnwpZCJmYo2Rm4nH99ebkqNzBqIFKecJ0jTmZC24EKsmJ95abbnK33OZBxg3J55IWcDLJk' })

    expect(fbUser).toEqual({
      facebookId: '102906495737213',
      email: 'loro_zpjvtdl_test@tfbnw.net',
      name: 'Loro Test'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
