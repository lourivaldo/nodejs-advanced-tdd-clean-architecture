import { InvalidMimeTypeError } from '@/application/errors'

type Extension = 'png' | 'jpg'

class AllowedMimeTypes {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimetype: string
  ) {}

  validate (): Error | undefined {
    let isValid = false
    if (this.isPng() || this.isJpg()) isValid = true
    else if (!isValid) return new InvalidMimeTypeError(this.allowed)
  }

  private isPng (): boolean {
    return this.allowed.includes('png') && this.mimetype === 'image/png'
  }

  private isJpg (): boolean {
    return this.allowed.includes('jpg') && /image\/jpe?g/.test(this.mimetype)
  }
}

describe('AllowedMimeTypes', () => {
  it('should return InvalidMimeTypeError if value is invalid', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/png')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypes(['jpg'], 'image/jpg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if value is valid', () => {
    const sut = new AllowedMimeTypes(['jpg'], 'image/jpeg')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
