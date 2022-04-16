import { RequiredStringValidator } from '@/application/validation'
import { ValidatorBuilder } from '@/application/validation/builder'

describe('ValidationBuilder', () => {
  it('Should return a RequiredStringValidator', () => {
    const validators = ValidatorBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .required()
      .build()

    expect(validators).toEqual([new RequiredStringValidator('any_value', 'any_name')])
  })
})
