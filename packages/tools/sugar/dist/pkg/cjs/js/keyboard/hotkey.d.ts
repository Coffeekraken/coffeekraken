import __SPromise from '@coffeekraken/s-promise';

export interface IHotkeySettings {
    element: HTMLElement;
    keyup: boolean;
    keydown: boolean;
    once: boolean;
    splitKey: string;
}
export default function __hotkey(hotkey: string, settings?: Partial<IHotkeySettings>): __SPromise<any>;
