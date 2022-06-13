import { RequestHandler } from 'express'
import multer from 'multer'
import { ServerError } from '@/application/errors'

export const adaptMulter: RequestHandler = (req, res, next) => {
  const multerOptions = {
    limits: {
      fileSize: 10000000
    }
  }
  const upload = multer(multerOptions).single('picture')
  upload(req, res, (error) => {
    if (error !== undefined) {
      return res.status(500).json({ error: new ServerError(error).message })
    }
    if (req.file !== undefined) {
      req.locals = {
        ...req.locals,
        file: { buffer: req.file.buffer, mimeType: req.file.mimetype }
      }
    }
    next()
  })
}
