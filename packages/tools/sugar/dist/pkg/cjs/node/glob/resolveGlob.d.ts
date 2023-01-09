import __SFile from '@coffeekraken/s-file';

export interface IResolveGlobSettings {
    cwd: string;
    symlinks: boolean;
    nodir: boolean;
    contentRegExp: RegExp;
    SFile: boolean;
    exclude: string | string[];
    defaultExcludes: boolean;
}
export default function __resolveGlob(globs: string | string[], settings?: Partial<IResolveGlobSettings>): __SFile[] | string[];
