import __SInterface from '@coffeekraken/s-interface';

export default class SCarpenterComponentInterface extends __SInterface {
    static get _definition(): {
        specs: {
            type: string;
            description: string;
            default: string;
            required: boolean;
        };
        adapter: {
            type: string;
            description: string;
            default: string;
            required: boolean;
        };
        sidebar: {
            type: string;
            description: string;
            default: boolean;
        };
        pagesLink: {
            type: string;
            description: string;
            default: string;
        };
        iframe: {
            type: string;
            description: string;
            default: boolean;
        };
        logo: {
            type: string;
            description: string;
            default: string;
        };
        icons: {
            type: string;
            description: string;
            default: {
                mobile: string;
                tablet: string;
                desktop: string;
                wide: string;
                folderOpen: string;
                folderClose: string;
            };
        };
    };
}
