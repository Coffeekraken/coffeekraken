
export interface IPackageJsonSyncSettings {
    highest: boolean;
    standardize: boolean;
}
export default function __packageJson(fromOrName?: string, settings?: Partial<IPackageJsonSyncSettings>): Promise<unknown>;
