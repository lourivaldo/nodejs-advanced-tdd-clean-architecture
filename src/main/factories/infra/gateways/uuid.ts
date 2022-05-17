import { UUIDHandler } from '@/infra/gateways'
import { UniqueId } from '@/infra/gateways/unique-id'

export const makeUuidHandler = (): UUIDHandler => {
  return new UUIDHandler()
}

export const makeUniqueId = (): UniqueId => {
  return new UniqueId(new Date())
}
