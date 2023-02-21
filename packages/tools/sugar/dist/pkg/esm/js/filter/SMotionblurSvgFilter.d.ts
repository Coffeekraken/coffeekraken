import { __SSvgFilter } from '@coffeekraken/sugar/filter';

export default class __SMotionblurSvgFilter extends __SSvgFilter {
    
    amount: number;
    
    _isMoving: boolean;
    
    _startMoveTimeout: any;
    
    constructor(amount?: number);
    
    applyTo(elm: any): void;
    
    unapplyFrom(elm: any): void;
    
    _onMotionStart(e: any): void;
    
    _onMotionStop(e: any): void;
    
    _handleFilter(): void;
    
    _setMotionBlur(): {
        x: number;
        y: number;
    };
    
    destroy(): void;
}
