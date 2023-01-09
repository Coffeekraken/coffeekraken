import __SPromise from '@coffeekraken/s-promise';

export interface IInViewportStatusChangeSettings {
    offset: string;
}
export default function __inViewportStatusChange($elm: HTMLElement, settings?: Partial<IInViewportStatusChangeSettings>): __SPromise;
