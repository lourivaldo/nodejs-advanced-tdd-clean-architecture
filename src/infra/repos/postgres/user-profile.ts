import { getRepository } from 'typeorm'
import { SaveUserPicture } from '@/domain/contracts/repositories'
import { PgUser } from '@/infra/repos/postgres/entities'
import { LoadUserProfile } from '../../../domain/contracts/repositories/user-profile'

type SaveInput = SaveUserPicture.Input
type LoadInput = LoadUserProfile.Input
type LoadOutput = LoadUserProfile.Output

export class PgUserProfileRepository implements SaveUserPicture {
  async savePicture ({ id, pictureUrl, initials }: SaveInput): Promise<void> {
    const pgUserRepo = getRepository(PgUser)
    await pgUserRepo.update({ id: parseInt(id) }, { pictureUrl, initials })
  }

  async load ({ id }: LoadInput): Promise<LoadOutput> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ id: parseInt(id) })
    if (pgUser !== undefined) return { name: pgUser.name }
  }
}
