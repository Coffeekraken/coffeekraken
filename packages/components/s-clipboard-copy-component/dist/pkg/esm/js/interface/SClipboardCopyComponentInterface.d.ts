import __SInterface from '@coffeekraken/s-interface';

export default class SClipboardCopyComponentInterface extends __SInterface {
    static get _definition(): {
        from: {
            description: string;
            type: string;
        };
        successTimeout: {
            description: string;
            type: string;
            default: number;
        };
        errorTimeout: {
            description: string;
            type: string;
            default: number;
        };
    };
}
