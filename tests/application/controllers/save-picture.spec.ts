import { RequiredFieldError } from '@/application/errors'
import { HttpResponse } from '@/application/helpers'
import { badRequest } from '../../../src/application/helpers/http'

type HttpRequest = { file: { buffer: Buffer, mimeType: string } }
type Model = Error

export class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported type. Allowed types: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

class SavePictureController {
  async handle ({ file }: HttpRequest): Promise<HttpResponse<Model>> {
    if (file === undefined || file === null) return badRequest(new RequiredFieldError('file'))
    if (file.buffer.length === 0) return badRequest(new RequiredFieldError('file'))
    return badRequest(new InvalidMimeTypeError(['jpeg', 'png']))
  }
}

describe('SavePictureController', () => {
  let sut: SavePictureController
  let mimeType: string
  let buffer: Buffer

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
  })

  beforeEach(() => {
    sut = new SavePictureController()
    mimeType = 'image/png'
  })

  it('should return 400 if file is not provided', async () => {
    const httpResponse = await sut.handle({ file: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is not provided', async () => {
    const httpResponse = await sut.handle({ file: null as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is empty', async () => {
    const httpResponse = await sut.handle({ file: { buffer: Buffer.from(''), mimeType } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file type is invalid', async () => {
    const httpResponse = await sut.handle({ file: { buffer, mimeType: 'invalid_type' } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new InvalidMimeTypeError(['jpeg', 'png'])
    })
  })
})
