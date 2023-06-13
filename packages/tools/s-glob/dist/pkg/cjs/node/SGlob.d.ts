import __SClass from '@coffeekraken/s-class';
import SFile from '@coffeekraken/s-file';
import type { IResolveGlobSettings } from '@coffeekraken/sugar/glob';

export interface ISGlobSettings {
}
export { IResolveGlobSettings };
export default class SGlob extends __SClass {
    
    _globs: any;
    
    static isGlob(glob: string): boolean;
    
    static resolveSync(globs: any, settings?: Partial<IResolveGlobSettings>): SFile[] | string[];
    
    static copySync(globs: string | string[], outDir: string, settings?: Partial<IResolveGlobSettings>): SFile[] | string[];
    
    static match(path: string, globs: string | string[]): boolean;
    
    static extractGlob(string: string): string;
    
    static extractNoneGlob(string: string): string;
    
    constructor(globs: string | string[], settings?: Partial<ISGlobSettings>);
    
    resolveSync(settings?: Partial<IResolveGlobSettings>): SFile[] | string[];
    
    copySync(outDir: string, settings?: Partial<IResolveGlobSettings>): SFile[] | string[];
    
    extractGlob(): string | string[];
    
    extractNoneGlob(): string | string[];
}
