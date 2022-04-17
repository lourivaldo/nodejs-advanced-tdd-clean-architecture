import request from 'supertest'
import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'

import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { app } from '@/main/config/app'
import { UnauthorizedError } from '@/application/errors'

describe('Login Routes', () => {
  describe('POST /login/facebook', () => {
    let pgBackup: IBackup
    const loadUserSpy = jest.fn()

    jest.mock('@/infra/apis/facebook', () => ({
      FacebookApi: jest.fn().mockReturnValue({
        loadUser: loadUserSpy
      })
    }))

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

    it('should return 200 with AccessToken', async () => {
      loadUserSpy.mockResolvedValueOnce({
        facebookId: 'any_id',
        name: 'any_name',
        email: 'any_email'
      })

      const { status, body } = await request(app)
        .post('/api/login/facebook')
        .send({ token: 'valid_token' })

      expect(status).toBe(200)
      expect(body.accessToken).toBeDefined()
    })

    it('should return 401 with UnauthorizedError', async () => {
      const { status, body } = await request(app)
        .post('/api/login/facebook')
        .send({ token: 'invalid_token' })

      expect(status).toBe(401)
      expect(body.error).toBe(new UnauthorizedError().message)
    })
  })
})
