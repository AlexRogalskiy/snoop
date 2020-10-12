export interface IInstall {
  bucket: string
  architecture: string
}

export interface IManifest {
  version: string
}

export interface IScoopConfig {
  lastupdate: string
  SCOOP_REPO: string
  SCOOP_BRANCH: string
  alias?: Record<string, string>
}
