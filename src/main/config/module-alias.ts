import { addAlias } from 'module-alias'
import { resolve } from 'path'

const path = process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'
addAlias('@', resolve(path))
