import { RequiredString } from '@/application/validation'
import { ValidatorBuilder } from '@/application/validation/builder'

describe('ValidationBuilder', () => {
  it('Should return a RequiredString', () => {
    const validators = ValidatorBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .required()
      .build()

    expect(validators).toEqual([new RequiredString('any_value', 'any_name')])
  })
})
