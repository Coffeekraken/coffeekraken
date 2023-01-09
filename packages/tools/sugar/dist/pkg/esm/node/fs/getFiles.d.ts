import __SFile from '@coffeekraken/s-file';

export interface IGetFilesSettings {
    cwd: string;
    watch: boolean;
    sFile: boolean;
    ignoreInitial: boolean;
    exclude: string[];
}
export interface IGetFilesResult {
    cwd: string;
    sFile: boolean;
    exclude: string[];
    files: (string | __SFile)[];
}
export default function __getFiles(paths: string | string[], settings?: Partial<IGetFilesSettings>): any;
