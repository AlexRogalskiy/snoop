import { filterApps, getAppInstall, getAppManifest } from '../utils.ts'
import { cyan, yellow, outdent } from '../deps.ts'

export const listApps = (filter = '') => {
  const { apps, total } = filterApps(filter)

  console.log(outdent`
    Installed apps${filter ? ` matching '${filter}'` : ''} (${filter ? `${apps.length}/` : ''}${total}):

    ${apps.map(app => {
      const { version } = getAppManifest(app)
      const { bucket } = getAppInstall(app)

      return `${app} ${cyan(version)} ${yellow(`[${bucket}]`)}`
    }).join('\n')}
  `)
}
