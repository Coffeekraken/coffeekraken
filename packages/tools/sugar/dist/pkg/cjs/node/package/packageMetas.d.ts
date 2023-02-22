
export interface IPackageMetas {
    name: string;
    description: string;
    version: string;
    author: string;
    license: string;
}
export interface IPackageMetasSettings {
    sources: string[];
    fields: string[];
}
export default function __packageMetas(path?: string, settings?: Partial<IPackageMetasSettings>): IPackageMetas;
