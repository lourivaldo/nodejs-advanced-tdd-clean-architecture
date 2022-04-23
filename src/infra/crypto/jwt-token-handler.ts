import { sign, verify } from 'jsonwebtoken'
import { TokenGenerator, TokenValidator } from '@/domain/contracts/crypto'

export class JwtTokenHandler implements TokenGenerator {
  constructor (private readonly secret: string) { }

  async generateToken ({ expirationInMs, key }: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }

  async validateToken ({ token }: TokenValidator.Params): Promise<void> {
    verify(token, this.secret)
  }
}
