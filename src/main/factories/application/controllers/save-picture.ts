import { Controller, SavePictureController } from '@/application/controllers'
import { makePgTransactionController } from '@/main/factories/application/decorators'
import { makeChangeProfilePicture } from '@/main/factories/domain/use-cases'

export const makeSavePictureController = (): Controller => {
  const controller = new SavePictureController(makeChangeProfilePicture())
  return makePgTransactionController(controller)
}
