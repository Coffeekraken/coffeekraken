
export interface INpmAddDependenciesSettings {
    cwd: string;
    dev: boolean;
}
export default function addDependencies(dependencies: Record<string, string>, settings: Partial<INpmAddDependenciesSettings>): Promise<any>;
