import { listBucket, knownBucket } from './commands/bucket.ts'
import { install } from './commands/install.ts'
import { list } from './commands/list.ts'
import { scoop } from './utils.ts'

const { args } = Deno

;(() => {
  if (args[0] === 'bucket') {
    if (args[1] === 'list') return listBucket()
    else if (args[1] === 'known') return knownBucket()
  } else if (args[0] === 'install') return install(args)
  else if (args[0] === 'list') return list(args[1])

  scoop(args)
})()
