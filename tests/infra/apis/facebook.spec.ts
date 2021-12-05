import { mock, MockProxy } from 'jest-mock-extended'
import { FacebookApi } from '@/infra/apis'
import { HttpGetClient } from '@/infra/http'

describe('FacebookApi', () => {
  let clientId: string
  let clientSecret: string
  let httpClient: MockProxy<HttpGetClient>
  let suit: FacebookApi

  beforeAll(() => {
    clientId = 'any_client_id'
    clientSecret = 'any_client_secret'
    httpClient = mock()
  })

  beforeEach(() => {
    suit = new FacebookApi(httpClient, clientId, clientSecret)
  })

  it('Should get app token', async () => {
    await suit.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    })
  })
})
