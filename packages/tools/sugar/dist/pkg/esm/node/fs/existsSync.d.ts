
export interface IExistsSettings {
    directory: boolean;
    file: boolean;
    symlink: boolean;
}
export default function __existsSync(path: string, settings?: Partial<IExistsSettings>): boolean;
