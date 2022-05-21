import { newDb, IMemoryDb } from 'pg-mem'
import { PgConnection } from '@/infra/repos/postgres/helpers'

export const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/repos/postgres/entities/index.ts']
  })
  await connection.synchronize()
  await PgConnection.getInstance().connect()
  return db
}
