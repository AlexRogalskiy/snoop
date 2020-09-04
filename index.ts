import { listBucket, knownBucket } from './commands/bucket.ts'
import { list } from './commands/list.ts'
import { run } from './utils.ts'

const { args } = Deno

;(() => {
  if (args[0] === 'bucket') {
    if (args[1] === 'list') return listBucket()
    else if (args[1] === 'known') return knownBucket()
  } else if (args[0] === 'list') return list(args[1])

  run(['scoop.cmd', ...args]).then(console.log)
})()
