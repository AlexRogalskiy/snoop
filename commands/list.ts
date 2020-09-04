import { getApps, getAppInstall, getAppManifest } from '../utils.ts'
import { cyan, yellow } from '../deps.ts'

export const list = (filter = '') => {
  const { apps, total } = getApps(filter)

  console.log(
    `Installed apps${filter ? ` matching '${filter}'` : ''} (${
      filter ? `${apps.length}/` : ''
    }${total}):\n`
  )

  for (const app of apps) {
    const { version } = getAppManifest(app)
    const { bucket } = getAppInstall(app)

    console.log(`${app} ${cyan(version)} ${yellow(`[${bucket}]`)}`)
  }
}
