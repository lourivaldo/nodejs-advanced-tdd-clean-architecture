import { v4 } from 'uuid'
import { UUIDGenerator } from '@/domain/contracts/gateways'

export class UUIDHandler implements UUIDGenerator {
  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Output {
    return key + '_' + v4()
  }
}
