import __SInterface from '@coffeekraken/s-interface';
export interface IHotkeySettings {
    once: boolean;
}
export declare class HotkeySettingsInterface extends __SInterface {
    static get _definition(): {
        once: {
            type: string;
            description: string;
            default: boolean;
        };
        splitChar: {
            type: string;
            description: string;
            default: string;
        };
    };
}
export { HotkeySettingsInterface as SettingsInterface };
export default function __hotkey(key: any, settings?: Partial<IHotkeySettings>): any;
