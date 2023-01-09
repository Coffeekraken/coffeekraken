
export interface IScrollToSettings {
    $elm: HTMLElement;
    duration: number;
    easing: Function;
    offset: number;
    offsetX: number;
    offsetY: number;
    align: 'start' | 'center' | 'end';
    justify: 'start' | 'center' | 'end';
    onFinish: Function;
}
declare function __scrollTo(target: HTMLElement | 'top' | 'bottom' | 'left' | 'right', settings?: Partial<IScrollToSettings>): Promise<any>;
declare namespace __scrollTo {
    var step: () => void;
}
export default __scrollTo;
