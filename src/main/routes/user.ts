import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.delete('/users/picture', auth)
}
