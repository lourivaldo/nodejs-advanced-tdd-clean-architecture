import './config/module-alias'

import 'reflect-metadata'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

app.listen(env.appPort, () => {
  console.log(`Server is running on port ${env.appPort}`)
})
