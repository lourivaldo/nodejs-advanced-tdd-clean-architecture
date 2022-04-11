import { IBackup } from 'pg-mem'
import { getRepository, getConnection, Repository } from 'typeorm'
import { PgUser } from '@/infra/postgres/entities'
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let pgUserRepo: Repository<PgUser>
  let pgBackup: IBackup

  describe('load', () => {
    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      pgBackup = db.backup()
      pgUserRepo = getRepository(PgUser)
    })

    afterAll(async () => {
      await getConnection()?.close()
    })

    beforeEach(() => {
      pgBackup.restore()
      sut = new PgUserAccountRepository()
    })

    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'any_email' })

      const account = await sut.load({ email: 'any_email' })

      expect(account).toEqual({ id: '1' })
    })

    it('should return undefined id email does not exists', async () => {
      const account = await sut.load({ email: 'any_email' })

      expect(account).toBeUndefined()
    })
  })
})
