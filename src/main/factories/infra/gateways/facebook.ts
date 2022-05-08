import { FacebookApi } from '@/infra/gateways'
import { env } from '@/main/config/env'
import { makeAxiosHttpClient } from '@/main/factories/infra/gateways'

export const makeFacebookApi = (): FacebookApi => {
  const axiosClient = makeAxiosHttpClient()
  return new FacebookApi(
    axiosClient,
    env.facebookApi.clientId,
    env.facebookApi.clientSecret
  )
}
