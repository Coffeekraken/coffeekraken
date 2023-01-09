import type { ISDurationObject } from '@coffeekraken/s-duration';

export interface IUnzipSettings {
    dest: string;
}
export interface IUnzipResult extends ISDurationObject {
    dest: string;
}
export default function __unzip(zipFilePath: string, settings?: Partial<IUnzipSettings>): Promise<IUnzipResult>;
