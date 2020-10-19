import type { IInstall, IManifest, IScoopConfig } from './types.ts'
import { readJsonSync } from './deps.ts'

export const SCOOP_DIR =
  Deno.env.get('SCOOP') || `${Deno.env.get('HOME')}/scoop`
export const APPS_DIR = `${SCOOP_DIR}/apps`
export const BUCKETS_DIR = `${SCOOP_DIR}/buckets`
export const CACHE_DIR = `${SCOOP_DIR}/cache`
export const MODULES_DIR = `${SCOOP_DIR}/modules`
export const PERSIST_DIR = `${SCOOP_DIR}/persist`
export const SHIMS_DIR = `${SCOOP_DIR}/shims`

export const getScoopConfig = () =>
  readJsonSync<IScoopConfig>(
    `${Deno.env.get('HOME')}/.config/scoop/config.json`
  )

export const isShovel = () =>
  getScoopConfig().SCOOP_REPO === 'https://github.com/Ash258/Scoop-Core'

export const getAppDir = (app: string, version = 'current') =>
  `${APPS_DIR}/${app}/${version}`

export const getAppManifest = (app: string) =>
  readJsonSync<IManifest>(
    `${getAppDir(app)}/${isShovel() ? 'scoop-manifest.json' : 'manifest.json'}`
  )

export const getAppInstall = (app: string) =>
  readJsonSync<IInstall>(
    `${getAppDir(app)}/${isShovel() ? 'scoop-install.json' : 'install.json'}`
  )

export const filterDirs = (filter = '', dir = APPS_DIR): [string[], number] => {
  const dirs: string[] = []
  let total = 0

  for (const { name } of Deno.readDirSync(dir)) {
    if (name.toLowerCase().includes(filter.toLowerCase())) dirs.push(name)
    total++
  }

  return [dirs, total]
}

export const git = async (cwd: string, ...args: string[]) => {
  const output = await Deno.run({
    // https://git-scm.com/docs/git#Documentation/git.txt--Cltpathgt
    cmd: ['git', ...args],
    cwd,
    stdout: 'piped',
  }).output()

  return new TextDecoder().decode(output).replace(/\n$/, '')
}
