import { filterDirs, BUCKETS_DIR, getAppDir, git } from '../utils.ts'
import { existsSync, cyan, yellow, outdent, readJsonSync } from '../deps.ts'

export const listBucket = async (filter = '') => {
  const [buckets, total] = filterDirs(filter, BUCKETS_DIR)
  const origins: string[] = []

  for (const bucket of buckets) {
    const origin = await git(
      `${BUCKETS_DIR}/${bucket}`,
      'remote',
      'get-url',
      'origin'
    )

    origins.push(origin)
  }

  console.log(outdent`
    Buckets${filter ? ` matching '${filter}'` : ''} (${
    filter ? `${buckets.length}/` : ''
  }${total}):

    ${buckets
      .map((bucket, index) => `${bucket}: ${cyan(origins[index])}`)
      .join('\n')}
  `)
}

export const knownBucket = () => {
  const buckets = Object.entries(
    readJsonSync<Record<string, string>>(`${getAppDir('scoop')}/buckets.json`)
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
