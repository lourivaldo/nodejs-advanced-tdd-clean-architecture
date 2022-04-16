import { RequiredStringValidator } from '@/application/validation'
import { Validator } from '../../../src/application/validation/validator'

class ValidatorBuilder {
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

describe('ValidationBuilder', () => {
  it('Should return a RequiredStringValidator', () => {
    const validators = ValidatorBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .required()
      .build()

    expect(validators).toEqual([new RequiredStringValidator('any_value', 'any_name')])
  })
})
