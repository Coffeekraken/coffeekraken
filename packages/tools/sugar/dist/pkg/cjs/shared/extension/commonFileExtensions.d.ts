
export type Types = ('audio' | 'compressed' | 'data' | 'disc' | 'email' | 'executable' | 'font' | 'image' | 'media' | 'programming' | 'text' | 'video' | 'web')[];
export interface ICommonFileExtensionsSettings {
    dot: boolean;
    exclude: string[];
}
export default function __commonFileExtensions(types?: Types, settings?: Partial<ICommonFileExtensionsSettings>): string[];
