import { mock, MockProxy } from 'jest-mock-extended'

export namespace TokenValidator {
  export type Params = { token: string }
}

export interface TokenValidator {
  validateToken: (params: TokenValidator.Params) => Promise<void>
}

type Setup = (crypto: TokenValidator) => Authorize
type Input = { token: string }
type Authorize = (params: Input) => Promise<void>

const setupAuthorize: Setup = (crypto) => async params => {
  await crypto.validateToken(params)
}

describe('Authorize', () => {
  let crypto: MockProxy<TokenValidator>

  let sut: Authorize
  let token: string

  beforeAll(() => {
    token = 'working_token'
    crypto = mock()
  })

  beforeEach(() => {
    sut = setupAuthorize(crypto)
  })

  it('Should call TokenValidator with correct params', async () => {
    await sut({ token })
    expect(crypto.validateToken).toHaveBeenCalledWith({ token })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })
})
