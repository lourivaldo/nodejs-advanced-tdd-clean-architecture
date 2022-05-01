import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'
import { SaveUserPicture } from '@/domain/contracts/repositories'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture) => ChangeProfilePicture
type Input = { userId: string, file?: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ userId, file }) => {
  let pictureUrl: string | undefined
  if (file !== undefined) {
    pictureUrl = await fileStorage.upload({ file, key: crypto.uuid({ key: userId }) })
  }
  await userProfileRepo.savePicture({ pictureUrl })
}
