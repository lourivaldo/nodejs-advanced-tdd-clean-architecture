import { FacebookApi } from '@/infra/apis/facebook'
import { AxiosHttpClient } from '@/infra/http/axios-client'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  it('should return a Facebook User if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret)

    const fbUser = await sut.loadUser({ token: 'EAAaA5UXMH5YBAJj73KGgTmP5Dpk72BZCq7eMcfODJEp52OBWYdE67hs1KCje5r4X5sKLGus51xGlhlZBDnTlwhx45JlqzgH4vK7dPy3hXRhZC5oSZCLxQcFjm3iE7vPC1f21cl8mVLd7xI1rfyVocXoZAlHyPK3yxRZCAPU1xDDCinvd5wOf7iKpk2hOhAgZCmft1DGhHvX9oZB5LZCVB54Yx' })

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
