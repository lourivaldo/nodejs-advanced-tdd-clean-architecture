import { mock, MockProxy } from 'jest-mock-extended'
import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { ChangeProfilePicture, setupChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'

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
