import { UploadFile, UUIDGenerator } from '@/domain/contracts/gateways'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator) => ChangeProfilePicture
type Input = { userId: string, file: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto) => async ({ userId, file }) => {
  if (file !== undefined) {
    await fileStorage.upload({ file, key: crypto.uuid({ key: userId }) })
  }
}
