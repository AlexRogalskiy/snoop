import type { IInstall, IManifest } from './types.ts'
import { readLines } from './deps.ts'

export const SCOOP_DIR =
  Deno.env.get('SCOOP') || `${Deno.env.get('HOME')}/scoop`
export const APPS_DIR = `${SCOOP_DIR}/apps`
export const BUCKETS_DIR = `${SCOOP_DIR}/buckets`
export const CACHE_DIR = `${SCOOP_DIR}/cache`
export const MODULES_DIR = `${SCOOP_DIR}/modules`
export const PERSIST_DIR = `${SCOOP_DIR}/persist`
export const SHIMS_DIR = `${SCOOP_DIR}/shims`

export const readJson = <T>(path: string | URL): T =>
  JSON.parse(Deno.readTextFileSync(path))

export const getAppDir = (app: string, version = 'current') =>
  `${APPS_DIR}/${app}/${version}`

export const getAppManifest = (app: string) =>
  readJson<IManifest>(`${getAppDir(app)}/manifest.json`)

export const getAppInstall = (app: string) =>
  readJson<IInstall>(`${getAppDir(app)}/install.json`)

export const filterDirs = (filter = '', dir = APPS_DIR): [string[], number] => {
  const dirs: string[] = []
  let total = 0

  for (const { name } of Deno.readDirSync(dir)) {
    if (name.toLowerCase().includes(filter.toLowerCase())) dirs.push(name)
    total++
  }

  return [dirs, total]
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

  return new TextDecoder().decode(output).replace(/\n$/, '')
}

export const readLine = async () =>
  ((await readLines(Deno.stdin).next()).value as string).replace('\r', '')
export const write = (input: string) =>
  Deno.stdout.writeSync(new TextEncoder().encode(input))
