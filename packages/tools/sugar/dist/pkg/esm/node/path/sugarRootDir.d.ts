
export interface ISugarRootDirSettings {
}
export interface ISugarRootDir {
    (settings?: ISugarRootDirSettings): string;
}
export default function __sugarRootDir(settings?: ISugarRootDirSettings): any;
