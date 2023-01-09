
export interface IPackageJsonSyncSettings {
    highest: boolean;
    standardize: boolean;
}
export default function __packageJsonSync(fromOrName?: string, settings?: Partial<IPackageJsonSyncSettings>): any;
