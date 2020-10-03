import { filterApps, PERSIST_DIR, readLine, write } from '../utils.ts'
import { yellow, outdent } from '../deps.ts'

export const listPersists = (filter = '') => {
  const { apps } = filterApps(filter)
  const { apps: persists, total } = filterApps(filter, PERSIST_DIR)

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
  const { apps } = filterApps('')
  const uninstalled = filterApps('', PERSIST_DIR).apps.filter(
    (app) => !apps.includes(app)
  )

  if (!uninstalled.length) return console.log('No obsolete persists found!')

  console.log(outdent`
    Uninstalled apps (${uninstalled.length}):

    ${uninstalled.join('\n')}
  `)
  write(yellow(`\nClean these persists [y/N]? `))

  if ((await readLine()).toLowerCase() === 'y') {
    for (const persist of uninstalled) {
      Deno.removeSync(`${PERSIST_DIR}/${persist}`, { recursive: true })
    }
    console.log('Obsolete persists cleaned!')
  }
}
