import { IBackup } from 'pg-mem'
import { getRepository, getConnection, Repository } from 'typeorm'
import { PgUser } from '@/infra/repos/postgres/entities'
import { PgUserAccountRepository } from '@/infra/repos/postgres'
import { makeFakeDb } from '@/tests/infra/repos/mocks'

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let pgUserRepo: Repository<PgUser>
  let pgBackup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    pgBackup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    pgBackup.restore()
    sut = new PgUserAccountRepository()
  })

  describe('load', () => {
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

  describe('saveWithFacebook', () => {
    it('should create an account if id is undefined', async () => {
      const { id } = await sut.saveWithFacebook({
        email: 'any_email',
        name: 'any_name',
        facebookId: 'any_fb_id'
      })
      const pgUser = await pgUserRepo.findOne({ where: { email: 'any_email' } })

      expect(pgUser?.id).toBe(1)
      expect(id).toBe('1')
    })

    it('should update an account if id is defined', async () => {
      const { id } = await pgUserRepo.save({
        email: 'any_email',
        name: 'any_name',
        facebookId: 'any_fb_id'
      })

      await sut.saveWithFacebook({
        id: '1',
        email: 'new_email',
        name: 'new_name',
        facebookId: 'new_fb_id'
      })
      const pgUser = await pgUserRepo.findOne({ where: { id: 1 } })

      expect(pgUser).toEqual({
        id: 1,
        email: 'any_email',
        name: 'new_name',
        facebookId: 'new_fb_id'
      })
      expect(id).toBe(1)
    })
  })
})
