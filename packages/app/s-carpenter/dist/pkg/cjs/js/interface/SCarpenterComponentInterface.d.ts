import __SInterface from '@coffeekraken/s-interface';

export default class SCarpenterComponentInterface extends __SInterface {
    static get _definition(): {
        src: {
            type: string;
            description: string;
            default: string;
            required: boolean;
        };
        window: {
            type: string;
            description: string;
            default: Window & typeof globalThis;
            required: boolean;
        };
        viewportElm: {
            type: string;
            description: string;
            default: string;
        };
        autoInit: {
            type: string;
            description: string;
            default: boolean;
        };
        escape: {
            type: string;
            description: string;
            default: boolean;
        };
        autoEdit: {
            type: string;
            description: string;
            default: boolean;
        };
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
        features: {
            type: string;
            description: string;
            default: {
                save: boolean;
                delete: boolean;
                upload: boolean;
                nav: boolean;
                media: boolean;
            };
        };
        ghostSpecs: {
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
