import __SInterface from '@coffeekraken/s-interface';

export default class SSugarFeatureInterface extends __SInterface {
    static get _definition(): {
        pleasantCss: {
            description: string;
            type: string;
            default: boolean;
        };
        autofocus: {
            description: string;
            type: string;
            default: boolean;
        };
        viewportAware: {
            description: string;
            type: string;
            default: boolean;
        };
        containerQuery: {
            description: string;
            type: string;
            default: boolean;
        };
        scrolled: {
            description: string;
            type: string;
            default: boolean;
        };
        scrolledDelta: {
            description: string;
            type: string;
            default: number;
        };
        vhvar: {
            description: string;
            type: string;
            default: boolean;
        };
        autoResize: {
            description: string;
            type: string;
            default: boolean;
        };
        confirmBtn: {
            description: string;
            type: string;
            default: boolean;
        };
        inputAdditionalAttributes: {
            description: string;
            type: string;
            default: boolean;
        };
        resizeTransmations: {
            description: string;
            type: string;
            default: boolean;
        };
        linksStateAttributes: {
            description: string;
            type: string;
            default: boolean;
        };
        preventScrollRestoration: {
            description: string;
            type: string;
            default: boolean;
        };
        env: {
            description: string;
            type: string;
            default: boolean;
        };
    };
}
