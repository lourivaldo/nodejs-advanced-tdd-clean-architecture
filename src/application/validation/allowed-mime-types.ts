import { InvalidMimeTypeError } from '@/application/errors'
import { Validator } from '@/application/validation/validator'

export type Extension = 'png' | 'jpg'

export class AllowedMimeTypes implements Validator {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimetype: string
  ) {}

  validate (): Error | undefined {
    let isValid = false
    if (this.isPng() || this.isJpg()) isValid = true
    else if (!isValid) return new InvalidMimeTypeError(this.allowed)
  }

  private isPng (): boolean {
    return this.allowed.includes('png') && this.mimetype === 'image/png'
  }

  private isJpg (): boolean {
    return this.allowed.includes('jpg') && /image\/jpe?g/.test(this.mimetype)
  }
}
