import request from 'supertest'
import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'

import { makeFakeDb } from '@/tests/infra/repos/mocks'
import { app } from '@/main/config/app'

describe('User Routes', () => {
  describe('DELETE /users/picture', () => {
    let pgBackup: IBackup
    const loadUserSpy = jest.fn()

    beforeAll(async () => {
      const db = await makeFakeDb()
      pgBackup = db.backup()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      pgBackup.restore()
    })

    it('should return 403 if no authorization header is present', async () => {
      loadUserSpy.mockResolvedValueOnce({
        facebookId: 'any_id',
        name: 'any_name',
        email: 'any_email'
      })

      const { status } = await request(app)
        .delete('/api/users/picture')

      expect(status).toBe(403)
    })
  })
})
