import './config/module-alias'

import 'reflect-metadata'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { createConnection } from 'typeorm'

createConnection()
  .then(() => {
    app.listen(env.appPort, () => {
      console.log(`Server is running on port ${env.appPort}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
