
export interface ISrcRootDirSettings {
}
export default interface ISrcRootDir {
    (settings?: ISrcRootDirSettings): string;
}
export default function __srcRootDir(settings?: ISrcRootDirSettings): any;
