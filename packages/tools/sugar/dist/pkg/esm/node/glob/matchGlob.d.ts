
export interface IMatchGlobSettings {
    cwd: string;
    symlinks: boolean;
    nodir: boolean;
}
export default function __matchGlob(input: any, glob: any, settings?: Partial<IMatchGlobSettings>): boolean;
