import axios from 'axios'
import { HttpGetClient } from '@/infra/http/client'

export class AxiosHttpClient implements HttpGetClient {
  async get<T = any> (args: HttpGetClient.Params): Promise<T> {
    const result = await axios.get(args.url, { params: args.params })
    return result.data
  }
}
