import __SLitComponent from '@coffeekraken/s-lit-component';
export default class CKBlob extends __SLitComponent {
    static get properties(): any;
    constructor();
    _renderer: any;
    _scene: any;
    _camera: any;
    _sphere: any;
    _grains: any[];
    _icons: any[];
    _iconsGroups: any[];
    _start: number;
    _isDark: any;
    _postprocessing: {};
    _$html: HTMLHtmlElement;
    firstUpdated(): Promise<void>;
    _updatePlaneWave(object: any): void;
    initPostprocessing(): void;
    addControls(): void;
    addGrains(): Promise<void>;
    createPlanePoints(color: any, alphaVariation: any, pointSize?: string): any;
    loadTexture(path: any): any;
    createGrainMaterial(texturePath: any): any;
    loadCoffeeGrain(): any;
    animate(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
