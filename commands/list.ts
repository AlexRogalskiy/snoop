import { filterDirs, getAppInstall, getAppManifest } from '../utils.ts'
import { cyan, yellow, outdent } from '../deps.ts'

export const listApps = (filter = '') => {
  const [_apps, total] = filterDirs(filter)
  const apps = _apps.filter((app) => app !== 'scoop')

  console.log(outdent`
    Installed apps${filter ? ` matching '${filter}'` : ''} (${
    filter ? `${apps.length}/` : ''
  }${total - 1}):

    ${apps
      .map((app) => {
        const { version } = getAppManifest(app)
        const { bucket } = getAppInstall(app)

        return `${app} ${cyan(version)} ${yellow(`[${bucket}]`)}`
      })
      .join('\n')}
  `)
}
