import __SInterface from '@coffeekraken/s-interface';

export default class SDocComponentInterface extends __SInterface {
    static get _definition(): {
        endpoints: {
            type: string;
            description: string;
            default: any;
        };
    };
}
