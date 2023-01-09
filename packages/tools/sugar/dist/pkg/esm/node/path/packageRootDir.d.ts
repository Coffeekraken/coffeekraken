
export interface IPackageRootSettings {
    highest: boolean;
    upCount: number;
    requiredProperties: string[];
}
export default function __packageRootDir(from?: string, settings?: Partial<IPackageRootSettings>): any;
