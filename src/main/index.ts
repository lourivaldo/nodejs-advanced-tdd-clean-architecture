import './config/module-alias'

import 'reflect-metadata'
import { env } from '@/main/config/env'
import { createConnection } from 'typeorm'

createConnection()
  .then(async () => {
    const { app } = await import('@/main/config/app')
    app.listen(env.appPort, () => {
      console.log(`Server is running on port ${env.appPort}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
