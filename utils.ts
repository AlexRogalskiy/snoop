import { readJsonSync } from './deps.ts'
import { IInstall, IManifest } from './types.ts'

export const SCOOP_DIR =
  Deno.env.get('SCOOP') || `${Deno.env.get('HOME')}/scoop`
export const APPS_DIR = `${SCOOP_DIR}/apps`
export const BUCKETS_DIR = `${SCOOP_DIR}/buckets`
export const CACHE_DIR = `${SCOOP_DIR}/cache`
export const MODULES_DIR = `${SCOOP_DIR}/modules`
export const PERSIST_DIR = `${SCOOP_DIR}/persist`
export const SHIMS_DIR = `${SCOOP_DIR}/shims`

export const getAppDir = (app: string, version = 'current') =>
  `${APPS_DIR}/${app}/${version}`

export const getAppManifest = (app: string) =>
  readJsonSync(`${getAppDir(app)}/manifest.json`) as IManifest

export const getAppInstall = (app: string) =>
  readJsonSync(`${getAppDir(app)}/install.json`) as IInstall

export const getApps = (filter: string) => {
  const apps: string[] = []
  let total = 0

  for (const { name } of Deno.readDirSync(APPS_DIR)) {
    if (name !== 'scoop') {
      total++
      if (name.includes(filter)) apps.push(name)
    }
  }

  return { apps, total }
}

export const scoop = async (args: string[]) => {
  const { stdout } = Deno.run({
    cmd: ['scoop.cmd', ...args],
    stdout: 'piped',
  })
  const iter = Deno.iter(stdout)

  for await (const chunk of iter) {
    Deno.stdout.writeSync(chunk)
  }
}

export const git = async (path: string, ...args: string[]) => {
  const output = await Deno.run({
    // https://git-scm.com/docs/git#Documentation/git.txt--Cltpathgt
    cmd: ['git', '-C', path, ...args],
    stdout: 'piped',
  }).output()

  return new TextDecoder('utf-8').decode(output).replace(/\n$/, '')
}
