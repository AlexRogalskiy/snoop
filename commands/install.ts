import { scoop, getAppDir } from '../utils.ts'
import { existsSync } from '../deps.ts'

export const install = async (args: string[]) => {
  await scoop(args)
  if (!existsSync(getAppDir(args[1]))) {
    scoop(['uninstall', args[1]])
  }
}
