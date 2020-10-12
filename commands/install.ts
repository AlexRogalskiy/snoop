import { scoop, getAppDir } from '../utils.ts'
import { existsSync } from '../deps.ts'

export const install = async (apps: string[]) => {
  await scoop(['install', ...apps])

  // Uninstall apps that fail to install
  for (const app of apps) {
    if (!existsSync(getAppDir(app))) {
      scoop(['uninstall', app])
    }
  }
}
