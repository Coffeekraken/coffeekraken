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
        specsObjUrl: {
            type: string;
            description: string;
            default: string;
            required: boolean;
        };
        saveComponentUrl: {
            type: string;
            description: string;
            default: string;
            required: boolean;
        };
        deleteComponentUrl: {
            type: string;
            description: string;
            default: string;
            required: boolean;
        };
        savePageUrl: {
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
        pagesUrl: {
            type: string;
            description: string;
            default: string;
        };
        features: {
            type: string;
            description: string;
            default: {
                insert: boolean;
                edit: boolean;
                delete: boolean;
                move: boolean;
                upload: boolean;
                savePage: boolean;
                saveComponent: boolean;
                media: boolean;
                nav: boolean;
            };
        };
        frontspec: {
            type: string;
            title: string;
            description: string;
            default: Any;
        };
        defaultMedia: {
            type: string;
            title: string;
            description: string;
            default: Any;
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
        i18n: {
            type: string;
            description: string;
            default: {
                addComponent: string;
                modeInsert: string;
                modeEdit: string;
                modeToggle: string;
            };
        };
        icons: {
            type: string;
            description: string;
            default: {
                component: string;
                delete: string;
                edit: string;
                save: string;
                add: string;
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
