import { PgUserAccountRepository } from '@/infra/repos/postgres'

export const makePgUserAccountRepository = (): PgUserAccountRepository => {
  return new PgUserAccountRepository()
}
