import { PgUserProfileRepository } from '@/infra/repos/postgres'

export const makePgUserProfileRepository = (): PgUserProfileRepository => {
  return new PgUserProfileRepository()
}
