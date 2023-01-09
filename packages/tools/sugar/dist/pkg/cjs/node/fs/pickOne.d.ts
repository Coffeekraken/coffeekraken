import __SFile from '@coffeekraken/s-file';

export interface IPickOneSettings {
    cwd: string;
    SFile: boolean;
}
export default function __pickOne(filesNames: string[], settings?: Partial<IPickOneSettings>): __SFile | string;
