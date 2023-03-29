
export interface IDependencyTreeNodeModulesConfig {
    entry: string;
}
export interface IDependencyTreeExtendedSettings {
    requireConfig?: string;
    webpackConfig?: string;
    tsConfig?: string;
    nodeModulesConfig?: IDependencyTreeNodeModulesConfig;
    filter?(path: string): number;
    nonExistent?: string[];
    detective?: any;
    cache?: boolean | string;
    deep?: boolean;
}
export default function __dependencyTree(filePath: string, settings?: Partial<IDependencyTreeExtendedSettings>): any;
