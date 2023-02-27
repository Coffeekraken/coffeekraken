
export interface IMakeFloatSettings {
    position: 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'auto';
    shift: number;
    offset: number;
    arrow: boolean;
    arrowSize: number;
    arrowPadding: number;
}
export interface IMakeFloatApi {
    update: Function;
    cancel: Function;
}
export default function __makeFloat($elm: HTMLElement, $depending: HTMLElement, settings?: Partial<IMakeFloatSettings>): IMakeFloatApi;
