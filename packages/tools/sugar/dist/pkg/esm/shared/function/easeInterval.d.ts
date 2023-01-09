
export interface IEaseIntervalSettings {
    interval: number;
    easing: Function;
    from: number;
    to: number;
    onEnd?: Function;
}
export default function __easeInterval(duration: number, cb: Function, settings?: Partial<IEaseIntervalSettings>): any;
