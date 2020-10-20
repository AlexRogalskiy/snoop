import { filterDirs, PERSIST_DIR } from '../utils.ts'
import { yellow, outdent, readLine, writeStringSync } from '../deps.ts'

export const listPersists = (filter = '') => {
  const [apps] = filterDirs(filter)
  const [persists, total] = filterDirs(filter, PERSIST_DIR)

  console.log(
    `Persists${filter ? ` matching '${filter}'` : ''} (${
      filter ? `${persists.length}/` : ''
    }${total}):\n`
  )

  for (const persist of persists) {
    console.log(
      `${persist}${apps.includes(persist) ? '' : yellow(' [Uninstalled]')}`
    )
  }
}

export const cleanPersists = async () => {
  const [apps] = filterDirs()
  const uninstalled = filterDirs('', PERSIST_DIR)[0].filter(
    (app) => !apps.includes(app)
  )

  if (!uninstalled.length) return console.log('No obsolete persists found!')

  console.log(outdent`
    Uninstalled apps (${uninstalled.length}):

    ${uninstalled.join('\n')}
  `)
  writeStringSync(yellow(`\nClean these persists [y/N]? `))

  if ((await readLine()).toLowerCase() === 'y') {
    for (const persist of uninstalled) {
      Deno.removeSync(`${PERSIST_DIR}/${persist}`, { recursive: true })
    }
    console.log('Obsolete persists cleaned!')
  }
}
