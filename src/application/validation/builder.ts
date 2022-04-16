import { RequiredStringValidator, Validator } from '@/application/validation'

export class ValidatorBuilder {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: { value: string, fieldName: string }): ValidatorBuilder {
    return new ValidatorBuilder(params.value, params.fieldName)
  }

  required (): ValidatorBuilder {
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
