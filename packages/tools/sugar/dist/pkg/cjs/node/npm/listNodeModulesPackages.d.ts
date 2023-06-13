
export interface IListNodeModulesPackagesSettings {
    pathes: string[];
    monorepo: boolean;
}
export default function listNodeModulesPackages(settings?: Partial<IListNodeModulesPackagesSettings>): Record<string, any>;
