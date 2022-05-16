import axios from 'axios'
import { env } from '@/main/config/env'
import { AwsS3FileStorage } from '@/infra/gateways'

describe('AWS S3 Integration Tests', () => {
  let sut: AwsS3FileStorage

  beforeEach(() => {
    sut = new AwsS3FileStorage(
      env.s3.accessKey,
      env.s3.secret,
      env.s3.bucket
    )
  })

  it('should upload and delete image from AWS s3', async () => {
    const onePixelImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjODJF5T8ABhgCfM/XUK8AAAAASUVORK5CYII='
    const file = Buffer.from(onePixelImage, 'base64')
    const fileName = 'any_file_name.png'

    const pictureUrl = await sut.upload({ fileName, file })

    expect((await axios.get(pictureUrl)).status).toEqual(200)

    await sut.delete({ fileName })

    await expect(axios.get(pictureUrl)).rejects.toThrow()
  })
})
