import __SLitComponent from '@coffeekraken/s-lit-component';
import type { IFloatApi, IFloatSettings } from '@coffeekraken/sugar/js/dom/ui/makeFloat';
import __define from './define';
export interface ISColorPickerComponentProps {
    name: string;
    value: string;
    placeholder: string;
    updateInput: ('pointerdown' | 'pointerup' | 'pointermove' | 'validate' | 'eyedropper' | 'reset' | 'close')[];
    format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
    inline: boolean;
    eyeDropper: boolean;
    actions: ('reset' | 'validate')[];
    backdrop: boolean;
    floatSettings: Partial<IFloatSettings>;
    copyIconClass: string;
    eyeDropperIconClass: string;
    copiedIconClass: string;
    buttonIconClass: string;
    backdropClass: string;
    position: 'top' | 'bottom';
    disabled: boolean;
}

export default class SColorPickerComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    static get state(): {
        h: number;
        s: number;
        l: number;
        r: number;
        g: number;
        b: number;
        a: number;
        hex: string;
        hexa: string;
        format: any;
        value: any;
    };
    _originalState: {};
    _floatApi: IFloatApi;
    _hasInput: boolean;
    _hasButton: boolean;
    _$input: any;
    _$colorInput: any;
    _$button: any;
    _$shade: any;
    _$hue: any;
    _$alpha: any;
    _$root: any;
    _$picker: any;
    _shadeCtx: any;
    _hueCtx: any;
    _alphaCtx: any;
    _hueColor: any;
    _inputColor: any;
    _color: any;
    _isShadeInInteraction: boolean;
    _isAlphaInInteraction: boolean;
    _isHueInInteraction: boolean;
    constructor();
    mount(): Promise<void>;
    firstUpdated(): Promise<void>;
    _initColor(): void;
    _updateInput(step: 'init' | 'pointerdown' | 'pointerup' | 'pointermove' | 'validate' | 'eyedropper' | 'reset' | 'close' | 'format'): void;
    _restoreState(): void;
    setFormat(format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'): void;
    _validate(): void;
    _reset(): void;
    _isAlphaWanted(): any;
    
    _initSelectionInteractions(): void;
    
    _setHueFromEvent(e: any, saveState?: boolean): void;
    _setHue(h: number, saveState?: boolean): void;
    
    _setShadeFromEvent(e: any, saveState?: boolean): void;
    _setShade(s: number, l: number, saveState?: boolean): void;
    
    _applyCssVariables(): void;
    
    _setAlphaFromEvent(e: any, saveState?: boolean): void;
    _setAlpha(a: number, saveState?: boolean): void;
    _copy(): void;
    _eyeDropper(): Promise<void>;
    
    _initHueSelector(): void;
    
    _updateAlphaSelector(): void;
    
    _updateShadeCanvas(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
