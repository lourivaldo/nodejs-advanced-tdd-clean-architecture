import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'secret',
  database: 'app_db',
  entities: ['dist/infra/postgres/entities/index.js']
}
