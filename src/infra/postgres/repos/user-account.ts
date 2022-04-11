import { getRepository } from 'typeorm'
import { LoadUserAccountRepository } from '@/data/contracts/repositories'
import { PgUser } from '@/infra/postgres/entities'
import { SaveFacebookAccountRepository } from '@/data/contracts/repositories/user-account'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFacebookAccountRepository.Params

export class PgUserAccountRepository implements LoadUserAccountRepository {
  private readonly pgUserRepo = getRepository(PgUser)

  async load (params: LoadParams): Promise<LoadResult> {
    const pgUser = await this.pgUserRepo.findOne({ where: { email: params.email } })
    if (pgUser != null) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook (params: SaveParams): Promise<void> {
    if (params.id === undefined) {
      await this.pgUserRepo.save({
        email: params.email,
        name: params.name,
        facebookId: params.facebookId
      })
    } else {
      await this.pgUserRepo.update(
        {
          id: parseInt(params.id)
        },
        {
          name: params.name,
          facebookId: params.facebookId
        }
      )
    }
  }
}
