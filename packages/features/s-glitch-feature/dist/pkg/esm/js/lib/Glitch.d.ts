import __SPromise from '@coffeekraken/s-promise';
import 'https:
export interface ISGlitchSettings {
    minDuration: number;
    maxDuration: number;
    minInterval: number;
    maxInterval: number;
}
export default class Glitch extends __SPromise {
    _channelLen: number;
    _imgPath: any;
    _$node: any;
    _imgOrigin: any;
    _copyData: any[];
    _flowLineImgs: any[];
    _shiftLineImgs: any[];
    _shiftRGBs: any[];
    _scatImgs: any[];
    _throughFlag: boolean;
    _p: any;
    _isLoaded: boolean;
    _mustDraw: boolean;
    _isStoped: boolean;
    _$canvas: any;
    _ctx: any;
    _timeout: any;
    constructor(imgPathOrImgElement: HTMLImageElement | String, $node: HTMLElement, settings?: Partial<ISGlitchSettings>);
    _handleTimeout(type?: 'glitch' | 'pause'): void;
    start(): void;
    stop(): void;
    _reseted: boolean;
    _draw(): void;
    _pixelsA: {};
    _replaceData(destImg: any, srcPixels: any): void;
    _flowLine(srcImg: any, obj: any): any;
    _shiftLine(srcImg: any): any;
    _shiftRGB(srcImg: any): any;
    _getRandomRectImg(srcImg: any): any;
}
