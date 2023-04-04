import __SInterface from '@coffeekraken/s-interface';

export default class SWysiwygComponentInterface extends __SInterface {
    static get _definition(): {
        frontspec: {
            type: string;
            description: string;
            default: boolean;
        };
    };
}
