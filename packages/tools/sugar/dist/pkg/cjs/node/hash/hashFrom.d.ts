
import { BinaryToTextEncoding } from 'crypto';

export interface IHashFromSettings {
    algo: string;
    digest: BinaryToTextEncoding;
}
export default function __hashFromSync(sources: (string | any)[], settings?: Partial<IHashFromSettings>): string | undefined;
