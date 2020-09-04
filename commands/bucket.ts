import { BUCKETS_DIR, getAppDir, git } from '../utils.ts'
import { readJsonSync, existsSync, cyan, yellow } from '../deps.ts'

export const listBucket = async () => {
  for (const { name } of Deno.readDirSync(BUCKETS_DIR)) {
    const remote = await git(
      `${BUCKETS_DIR}/${name}`,
      'remote',
      'get-url',
      'origin'
    )

    console.log(`${name}: ${cyan(remote)}`)
  }
}

export const knownBucket = () => {
  const buckets = readJsonSync(`${getAppDir('scoop')}/buckets.json`) as Record<
    string,
    string
  >

  for (const [name, location] of Object.entries(buckets)) {
    console.log(
      `${name}: ${cyan(location)}${
        existsSync(`${BUCKETS_DIR}/${name}`) ? yellow(' [Added]') : ''
      }`
    )
  }
}
