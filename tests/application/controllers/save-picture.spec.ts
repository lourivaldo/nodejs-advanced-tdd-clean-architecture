import { RequiredFieldError } from '@/application/errors'
import { HttpResponse } from '@/application/helpers'
import { badRequest } from '../../../src/application/helpers/http'

type HttpRequest = { file: any }
type Model = Error

class SavePictureController {
  async handle ({ file }: HttpRequest): Promise<HttpResponse<Model>> {
    return badRequest(new RequiredFieldError('file'))
  }
}

describe('SavePictureController', () => {
  it('should return 400 if file is not provided', async () => {
    const sut = new SavePictureController()

    const httpResponse = await sut.handle({ file: undefined })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })
})
