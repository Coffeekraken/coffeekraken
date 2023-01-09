import __SClass from '@coffeekraken/s-class';
import { IGetAnimationsFromElementResult } from '@coffeekraken/sugar/js/dom/style/getAnimationsFromElement';
import { IKeyframe } from '@coffeekraken/sugar/js/dom/style/getKeyframesFromStylesheets';

export interface INearestKeyframes {
    before?: IKeyframe;
    after?: IKeyframe;
    current?: IKeyframe;
}
export interface ISCssAnimationPlaySettings {
    easing: string | Function;
    duration: number;
    iterations: number;
    yoyo: boolean;
}
export interface ISCssAnimationSettings {
    debug: boolean;
    easing: string | Function;
    duration: number;
    iterations: number;
    yoyo: boolean;
}
export default class SCssAnimation extends __SClass {
    
    $elm: HTMLElement;
    
    private _animations;
    
    _tmpMatrix: any;
    get matrix(): Array<number>;
    
    get matrixStr(): string;
    _currentYoyoTimeout: any;
    _currentEaseInterval: any;
    
    constructor($elm: HTMLElement, settings: Partial<ISCssAnimationSettings>);
    
    play(settings?: Partial<ISCssAnimationPlaySettings>, animationName?: any): Promise<SCssAnimation>;
    
    stop(): SCssAnimation;
    
    seekTo(percentage: number, animationName?: any): SCssAnimation;
    
    _applyAnimationSettingsTo(animationObj: any, settings: Partial<ISCssAnimationPlaySettings>): ISCssAnimationPlaySettings;
    
    _getAnimatedProperties(animationName?: any): {};
    
    _getNearestKeyframesAtPercentageWithProperty(percentage: number, property: string, animationName?: any): INearestKeyframes;
    
    _getNearestKeyframesAtPercentage(percentage: number, animationName?: any): INearestKeyframes;
    
    getAnimationByName(name: string): IGetAnimationsFromElementResult;
}
