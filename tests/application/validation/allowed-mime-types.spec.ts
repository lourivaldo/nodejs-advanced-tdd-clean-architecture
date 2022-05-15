import { InvalidMimeTypeError } from '@/application/errors'

type Extension = 'png' | 'jpg'

class AllowedMimeTypes {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimetype: string
  ) {}

  validate (): Error {
    return new InvalidMimeTypeError(['png'])
  }
}

describe('AllowedMimeTypes', () => {
  it('should return InvalidMimeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })
})
