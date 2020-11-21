export interface ISProcessOutputSettings {
  something?: string
}
export default interface ISProcessOutput {
  new (settings: ISProcessOutputSettings): ISProcessOutput
  _settings: ISProcessOutputSettings
}