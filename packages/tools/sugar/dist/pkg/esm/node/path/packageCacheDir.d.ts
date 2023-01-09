
export interface IPackageCacheDirSettings {
}
export default interface IPackageCacheDir {
    (settings?: IPackageCacheDirSettings): string;
}
export default function __packageCacheDir(settings?: IPackageCacheDirSettings): any;
