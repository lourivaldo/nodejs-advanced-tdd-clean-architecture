import { getRepository } from 'typeorm'
import { SaveUserPicture } from '@/domain/contracts/repositories'
import { PgUser } from '@/infra/repos/postgres/entities'

type SaveInput = SaveUserPicture.Input

export class PgUserProfileRepository implements SaveUserPicture {
  async savePicture ({ id, pictureUrl, initials }: SaveInput): Promise<void> {
    const pgUserRepo = getRepository(PgUser)
    await pgUserRepo.update({ id: parseInt(id) }, { pictureUrl, initials })
  }
}
