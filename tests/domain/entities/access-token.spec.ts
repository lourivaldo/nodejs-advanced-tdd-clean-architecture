import { AccessToken } from '@/domain/entities'

describe('AccessToken', () => {
  it('Should create with a value', () => {
    const sut = new AccessToken('any_value')

    expect(sut).toEqual({ value: 'any_value' })
  })

  it('Should expire in 1800000 ms', () => {
    expect(AccessToken.expirationInMs).toEqual(1800000)
  })
})
