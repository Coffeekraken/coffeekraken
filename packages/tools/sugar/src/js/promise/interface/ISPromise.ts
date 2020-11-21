export interface ISPromiseSettings {
  id: string,
  destroyTimeout: number
}

export default interface {
  _settings: ISPromiseSettings
}