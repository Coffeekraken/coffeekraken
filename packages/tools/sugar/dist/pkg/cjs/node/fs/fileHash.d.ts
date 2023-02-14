
import { BinaryToTextEncoding } from 'crypto';

export interface IFileHashIncludeSettings {
    ctime: boolean;
}
export interface IFileHashSettings {
    algo: string;
    digest: BinaryToTextEncoding;
    include: Partial<IFileHashIncludeSettings>;
}
export default function __fileHash(filePath: string, settings?: Partial<IFileHashSettings>): string;
