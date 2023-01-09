
export interface INpmInstallSettings {
    cwd: string;
    manager: 'yarn' | 'npm';
    args: any;
}
export interface INpmInstallResult {
}
export default function install(packageNames: string | string[], settings: Partial<INpmInstallSettings>): Promise<INpmInstallResult>;
