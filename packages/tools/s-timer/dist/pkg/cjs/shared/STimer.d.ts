import __SPromise from '@coffeekraken/s-promise';

export default class STimer extends __SPromise {
    
    _duration: number;
    
    _remaining: number;
    
    _tickCount: any;
    
    _tickInterval: number;
    
    _tickSetTimeout: any;
    
    _startTime: any;
    
    _tickTime: any;
    
    _pauseTime: any;
    
    constructor(duration: any, settings?: {});
    
    _tick(): void;
    
    get remaining(): number;
    
    set duration(duration: number);
    get duration(): number;
    
    set tickCount(tickCount: any);
    get tickCount(): any;
    
    get percentage(): number;
    
    reset(start?: boolean): this;
    
    start(duration?: any): this;
    
    pause(): this;
    
    stop(): this;
    
    destroy(): this;
    
    isStarted(): boolean;
}
