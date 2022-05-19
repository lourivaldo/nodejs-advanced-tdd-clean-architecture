import { Router } from 'express'
import { adaptExpressRoute as adapt, adaptMulter as upload } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import { makeSavePictureController } from '@/main/factories/application/controllers'

export default (router: Router): void => {
  router.delete('/users/picture', auth, adapt(makeSavePictureController()))
  router.put('/users/picture', auth, upload, adapt(makeSavePictureController()))
}
