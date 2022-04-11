import { sign } from 'jsonwebtoken'
import { TokenGenerator } from '@/data/contracts/crypto'

export class JwtTokenGenerator implements TokenGenerator {
  constructor (private readonly secret: string) { }

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = params.expirationInMs / 1000
    return sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
  }
}
