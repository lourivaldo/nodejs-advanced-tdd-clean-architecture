import { sign } from 'jsonwebtoken'
import { TokenGenerator } from '@/data/contracts/crypto'

type Params = TokenGenerator.Params
type Result = TokenGenerator.Result

export class JwtTokenGenerator implements TokenGenerator {
  constructor (private readonly secret: string) { }

  async generateToken ({ expirationInMs, key }: Params): Promise<Result> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }
}
