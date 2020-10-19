import { getAppDir } from '../utils.ts'
import { existsSync, run } from '../deps.ts'

export const install = async (apps: string[]) => {
  await run(['scoop.cmd', 'install', ...apps])

  // Uninstall apps that fail to install
  for (const app of apps) {
    if (!existsSync(getAppDir(app))) {
      run(['scoop.cmd', 'uninstall', app])
    }
  }
}
