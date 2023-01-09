import __SInterface from '@coffeekraken/s-interface';

export default class SComponentUtilsSettingsInterface extends __SInterface {
    static get _definition(): {
        name: {
            type: string;
            description: string;
        };
        interface: {
            description: string;
            type: string;
        };
        props: {
            description: string;
            type: string;
        };
        style: {
            description: string;
            type: string;
        };
        defaultProps: {
            description: string;
            type: string;
        };
        useTagNameForClassName: {
            type: string;
            description: string;
            default: boolean;
        };
    };
}
