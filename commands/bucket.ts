import { BUCKETS_DIR, getAppDir, git, readJson } from '../utils.ts'
import { existsSync, cyan, yellow, outdent } from '../deps.ts'

export const listBucket = async () => {
  const buckets: string[] = []

  for (const { name } of Deno.readDirSync(BUCKETS_DIR)) {
    const remote = await git(
      `${BUCKETS_DIR}/${name}`,
      'remote',
      'get-url',
      'origin'
    )

    buckets.push(`${name}: ${cyan(remote)}`)
  }

  console.log(outdent`
    Buckets (${buckets.length}):

    ${buckets.join('\n')}
  `)
}

export const knownBucket = () => {
  const buckets = Object.entries(
    readJson<Record<string, string>>(`${getAppDir('scoop')}/buckets.json`)
  )

  console.log(outdent`
    Known buckets (${buckets.length}):

    ${buckets
      .map(
        ([name, location]) =>
          `${name}: ${cyan(location)}${
            existsSync(`${BUCKETS_DIR}/${name}`) ? yellow(' [Added]') : ''
          }`
      )
      .join('\n')}
  `)
}
