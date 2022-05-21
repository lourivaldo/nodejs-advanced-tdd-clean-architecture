import request from 'supertest'
import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'

import { makeFakeDb } from '@/tests/infra/repos/mocks'
import { app } from '@/main/config/app'
import { PgUser } from '@/infra/repos/postgres/entities'
import { env } from '@/main/config/env'
import { PgConnection } from '@/infra/repos/postgres/helpers'

describe('User Routes', () => {
  let pgBackup: IBackup
  let connection: PgConnection
  let pgUserRepo: Repository<PgUser>

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb()
    pgBackup = db.backup()
    pgUserRepo = connection.getRepository(PgUser)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    pgBackup.restore()
  })

  describe('DELETE /users/picture', () => {
    it('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .delete('/api/users/picture')

      expect(status).toBe(403)
    })

    it('should return 204 with valid data', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'Lourivaldo vasconcelos' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .delete('/api/users/picture')
        .set({ authorization })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: undefined, initials: 'LV' })
    })
  })

  describe('PUT /users/picture', () => {
    const uploadSpy = jest.fn()

    jest.mock('@/infra/gateways/aws-s3-file-storage', () => ({
      AwsS3FileStorage: jest.fn().mockReturnValue({ upload: uploadSpy })
    }))

    it('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .put('/api/users/picture')

      expect(status).toBe(403)
    })

    it('should return 204 with valid data', async () => {
      uploadSpy.mockResolvedValueOnce('any_url')
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'Lourivaldo vasconcelos' })
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .put('/api/users/picture')
        .set({ authorization })
        .attach('picture', Buffer.from('any_buffer'), { filename: 'any_name', contentType: 'image/png' })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: 'any_url', initials: undefined })
    })
  })
})
