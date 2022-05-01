import { mock, MockProxy } from 'jest-mock-extended'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator) => ChangeProfilePicture
type Input = { userId: string, file: Buffer }
type ChangeProfilePicture = (input: Input) => Promise<void>
const setupChangeProfilePicture: Setup = (fileStorage, crypto) => async ({ userId, file }) => {
  await fileStorage.upload({ file, key: crypto.uuid({ key: userId }) })
}

namespace UploadFile {
  export type Input = { file: Buffer, key: string }
}
interface UploadFile {
  upload: (input: UploadFile.Input) => Promise<void>
}

namespace UUIDGenerator {
  export type Input = { key: string }
  export type Output = string
}
interface UUIDGenerator {
  uuid: (input: UUIDGenerator.Input) => UUIDGenerator.Output
}

describe('ChangeProfilePicture', () => {
  let uuid: string
  let file: Buffer
  let fileStorage: MockProxy<UploadFile>
  let crypto: MockProxy<UUIDGenerator>
  let sut: ChangeProfilePicture

  beforeEach(() => {
    sut = setupChangeProfilePicture(fileStorage, crypto)
  })

  beforeAll(() => {
    uuid = 'any_unique_id'
    file = Buffer.from('any_buffer')
    fileStorage = mock()
    crypto = mock()
    crypto.uuid.mockReturnValue(uuid)
  })

  it('should call UploadFile with correct input', async () => {
    await sut({ userId: 'any_id', file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file, key: uuid })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })
})
