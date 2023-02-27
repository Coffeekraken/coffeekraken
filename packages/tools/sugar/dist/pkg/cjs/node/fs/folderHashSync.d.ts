
import { BinaryToTextEncoding } from 'crypto';

export interface IFolderHashIncludeSettings {
    ctime: boolean;
}
export interface IFolderHashSettings {
    recursive: boolean;
    algo: string;
    digest: BinaryToTextEncoding;
    include: Partial<IFolderHashIncludeSettings>;
}
export default function __folderHashSyncSync(folderPath: string, settings?: Partial<IFolderHashSettings>): string;
