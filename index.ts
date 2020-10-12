import { listBucket, knownBucket } from './commands/bucket.ts'
import { install } from './commands/install.ts'
import { listApps } from './commands/list.ts'
import { listPersists, cleanPersists } from './commands/persist.ts'
import { scoop } from './utils.ts'
import { outdent } from './deps.ts'

const { args } = Deno

switch (args[0]) {
  case 'bucket':
    switch (args[1]) {
      case 'list':
        listBucket(args[2])
        break
      case 'known':
        knownBucket()
        break
    }
    break
  case 'install':
    install(args.slice(1))
    break
  case 'list':
    listApps(args[1])
    break
  case 'persist':
    switch (args[1]) {
      case 'clean':
        cleanPersists()
        break
      case 'list':
        listPersists(args[2])
        break
    }

    console.log(outdent`
      scoop persist: cmd '${args[1] || ''}' not supported
      Usage: scoop persist clean|list [<args>]
    `)
    break
  default:
    scoop(args)
}
