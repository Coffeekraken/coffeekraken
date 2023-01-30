
export interface IPackagePathSettings {
    cwd: string;
    monorepo: boolean;
    global: boolean;
}
export default function packagePath(name: string, settings?: Partial<IPackagePathSettings>): any;
