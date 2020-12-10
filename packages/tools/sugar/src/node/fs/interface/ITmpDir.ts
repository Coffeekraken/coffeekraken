export interface ITmpDirSettings {
  scope?: 'local' | 'global';
}

export default interface ITmpDir {
  (settings?: ITmpDirSettings): string;
}
