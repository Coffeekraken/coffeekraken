
export interface IExistsSettings {
    directory: boolean;
    file: boolean;
    symlink: boolean;
}
export default function __exists(path: string, settings?: Partial<IExistsSettings>): Promise<boolean>;
