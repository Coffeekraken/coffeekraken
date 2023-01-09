
export interface IDistRootDirSettings {
}
export default interface IDistRootDir {
    (settings?: IDistRootDirSettings): string;
}
export default function __distRootDir(settings?: IDistRootDirSettings): any;
