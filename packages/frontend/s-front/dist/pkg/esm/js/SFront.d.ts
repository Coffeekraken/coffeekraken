import __SClass from '@coffeekraken/s-class';
import { ISFrontspec } from '@coffeekraken/s-frontspec';
import type { ISThemeInitSettings } from '@coffeekraken/s-theme';
import __STheme from '@coffeekraken/s-theme';

export interface ISFrontLegalSettings {
    cookieName: string;
    defaultMetas: any;
}
export interface ISFrontWireframeSettings {
    enabled: boolean;
}
export interface ISFrontInitSettings {
    id: string;
    frontspec: any;
    wireframe: Partial<ISFrontWireframeSettings>;
    legal: Partial<ISFrontLegalSettings>;
    theme: __STheme | Partial<ISThemeInitSettings>;
    logs: undefined | boolean;
}
export interface ISFrontSettings extends ISFrontInitSettings {
}
export interface ISThemeSetLodSettings {
    enabled: boolean;
    $context: HTMLElement;
}
export default class SFront extends __SClass {
    
    private static _defaultInstance;
    
    static init(settings?: Partial<ISFrontInitSettings>): SFront;
    
    static ensureIsInited(throwError?: boolean): boolean;
    
    static get instance(): SFront;
    
    theme: any;
    
    frontspec: ISFrontspec;
    
    _originalState: {
        lod: {
            level: any;
        };
        wireframe: {
            enabled: any;
        };
    };
    state: any;
    
    legal: {
        agree: boolean;
        metas: {};
    };
    
    constructor(settings?: Partial<ISFrontSettings>);
    
    get wireframe(): {
        enabled: boolean;
    };
    
    setWireframe(enabled: boolean): void;
    
    get lod(): {
        level: number;
    };
    
    setLod(level: string | number, settings?: Partial<ISThemeSetLodSettings>): void;
    
    _lodConfig: any;
    get lodConfig(): any;
    
    private _initLod;
    
    private _isTrackingInited;
    
    private _initTracking;
    
    private _initGtm;
    
    private _initPartytown;
    
    agreeLegal(metas?: any): void;
    
    disagreeLegal(): void;
    
    setLegalMetas(metas: any): void;
    
    getLegalMetas(): any;
    
    isLegalAgree(): any;
    
    _saveTimeout: any;
    save(): SFront;
    
    restore(): void;
    
    clear(): SFront;
}
