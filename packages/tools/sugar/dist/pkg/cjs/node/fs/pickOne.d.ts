import __SFile from '@coffeekraken/s-file';

export interface IPickOneSyncSettings {
    cwd: string;
    SFile: boolean;
}
export default function __pickOneSync(filesNames: string[], settings?: Partial<IPickOneSyncSettings>): __SFile | string;
