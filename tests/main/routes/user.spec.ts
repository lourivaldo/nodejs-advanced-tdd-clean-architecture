import request from 'supertest'
import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'

import { makeFakeDb } from '@/tests/infra/repos/mocks'
import { app } from '@/main/config/app'
import { PgUser } from '@/infra/repos/postgres/entities'
import { env } from '@/main/config/env'

describe('User Routes', () => {
  describe('DELETE /users/picture', () => {
    let pgBackup: IBackup
    let pgUserRepo: Repository<PgUser>

    beforeAll(async () => {
      const db = await makeFakeDb()
      pgBackup = db.backup()
      pgUserRepo = getRepository(PgUser)
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      pgBackup.restore()
    })

    it('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .delete('/api/users/picture')

      expect(status).toBe(403)
    })

    it('should return 204', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .delete('/api/users/picture')
        .set({ authorization })

      expect(status).toBe(204)
      expect(body).toEqual({})
    })
  })
})
