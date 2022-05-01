import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteFile, UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { ChangeProfilePicture, setupChangeProfilePicture } from '@/domain/use-cases/change-profile-picture'
import { LoadUserProfile, SaveUserPicture } from '@/domain/contracts/repositories'
import { mocked } from 'ts-jest/utils'
import { UserProfile } from '@/domain/entities'

jest.mock('@/domain/entities/user-profile')

describe('ChangeProfilePicture', () => {
  let uuid: string
  let file: Buffer
  let fileStorage: MockProxy<UploadFile & DeleteFile>
  let crypto: MockProxy<UUIDGenerator>
  let userProfileRepo: MockProxy<SaveUserPicture & LoadUserProfile>
  let sut: ChangeProfilePicture

  beforeEach(() => {
    sut = setupChangeProfilePicture(fileStorage, crypto, userProfileRepo)
  })

  beforeAll(() => {
    uuid = 'any_unique_id'
    file = Buffer.from('any_buffer')
    fileStorage = mock()
    fileStorage.upload.mockResolvedValue('any_url')
    crypto = mock()
    crypto.uuid.mockReturnValue(uuid)
    userProfileRepo = mock()
    userProfileRepo.load.mockResolvedValue({ name: 'Lourivaldo Coutinho Vasconcelos' })
  })

  it('should call UploadFile with correct input', async () => {
    await sut({ userId: 'any_id', file })

    expect(fileStorage.upload).toHaveBeenCalledWith({ file, key: uuid })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('should not call UploadFile when file is undefined', async () => {
    await sut({ userId: 'any_id', file: undefined })

    expect(fileStorage.upload).not.toHaveBeenCalled()
  })

  it('should call SaveUserPicture with correct input', async () => {
    await sut({ userId: 'any_id', file })

    expect(userProfileRepo.savePicture).toHaveBeenCalledWith(mocked(UserProfile).mock.instances[0])
    expect(userProfileRepo.savePicture).toHaveBeenCalledTimes(1)
  })

  it('should call LoadUserProfile with correct input', async () => {
    await sut({ userId: 'any_id', file: undefined })

    expect(userProfileRepo.load).toHaveBeenCalledWith({ id: 'any_id', initials: undefined })
    expect(userProfileRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should not call LoadUserProfile if file exists', async () => {
    await sut({ userId: 'any_id', file })

    expect(userProfileRepo.load).not.toHaveBeenCalled()
  })

  it('should return correct data on success', async () => {
    mocked(UserProfile).mockImplementation(id => ({
      setPicture: jest.fn(),
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: 'any_initials'
    }))

    const result = await sut({ userId: 'any_id', file })

    expect(result).toMatchObject({
      pictureUrl: 'any_url',
      initials: 'any_initials'
    })
  })

  it('should call DeleteFile when file exists and SaveUserPicture throws', async () => {
    userProfileRepo.savePicture.mockRejectedValueOnce(new Error('any_error'))
    expect.assertions(2)

    const promise = sut({ userId: 'any_id', file })

    promise.catch(() => {
      expect(fileStorage.delete).toHaveBeenCalledWith({ key: uuid })
      expect(fileStorage.delete).toHaveBeenCalledTimes(1)
    })
  })

  it('should not call DeleteFile when file does not exists and SaveUserPicture throws', async () => {
    userProfileRepo.savePicture.mockRejectedValueOnce(new Error('any_error'))
    expect.assertions(1)

    const promise = sut({ userId: 'any_id', file: undefined })

    promise.catch(() => {
      expect(fileStorage.delete).not.toHaveBeenCalled()
    })
  })
})
