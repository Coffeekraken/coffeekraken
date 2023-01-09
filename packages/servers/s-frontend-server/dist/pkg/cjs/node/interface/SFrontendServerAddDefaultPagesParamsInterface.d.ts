import __SInterface from '@coffeekraken/s-interface';

export default class SFrontendServerAddDefaultPagesParamsIn extends __SInterface {
    static get _definition(): {
        yes: {
            description: string;
            type: string;
            default: boolean;
            alias: string;
        };
        viewsDir: {
            description: string;
            type: string;
            default: any;
        };
        pagesDir: {
            description: string;
            type: string;
            default: any;
        };
    };
}
