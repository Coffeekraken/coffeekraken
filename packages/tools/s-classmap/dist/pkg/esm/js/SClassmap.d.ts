import type { ISClassmapBaseSettings } from '../shared/SClassmapBase';
import __SClassmapBase from '../shared/SClassmapBase';

export interface ISClassmapSettings extends ISClassmapBaseSettings {
    patchNativeMethods: boolean;
}
export default class SClassmap extends __SClassmapBase {
    
    static init(settings?: ISClassmapSettings): SClassmap;
    
    static isEnabled(): boolean;
    
    _areNativeMethodsPatched: boolean;
    static areNativeMethodsPatched(): boolean;
    
    constructor(settings?: Partial<ISClassmapSettings>);
    
    patchNativeMethods(): void;
    resolve(cls: string): string;
    patchElement($elm: HTMLElement): void;
    patchDomLive($rootNode?: HTMLElement): void;
    patchDom($rootNode: HTMLElement): void;
    patchHtml(html: string): string;
    patchSelector(sel: any): any;
    
    loadFromUrl(url: string): Promise<Record<string, string>>;
}
