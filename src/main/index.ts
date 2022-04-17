import './config/module-alias'

import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { config } from '@/infra/postgres/helpers'

createConnection(config)
  .then(() => {
    app.listen(env.appPort, () => {
      console.log(`Server is running on port ${env.appPort}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
