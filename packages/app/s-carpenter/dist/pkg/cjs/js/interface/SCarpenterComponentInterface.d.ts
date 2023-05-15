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
        endpoints: {
            type: string;
            description: string;
            default: {
                base: string;
                specs: string;
                nodes: string;
                pages: string;
                scopes: string;
                categories: string;
            };
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
                scope: boolean;
                insert: boolean;
                edit: boolean;
                delete: boolean;
                move: boolean;
                upload: boolean;
                newPage: boolean;
                savePage: boolean;
                saveComponent: boolean;
                media: boolean;
                nav: boolean;
            };
        };
        categories: {
            type: string;
            description: string;
            default: {
                bare: {
                    name: string;
                    description: string;
                    icon: string;
                };
                sections: {
                    name: string;
                    description: string;
                    icon: string;
                };
                components: {
                    name: string;
                    description: string;
                    icon: string;
                };
            };
        };
        noPreviewIcon: {
            type: string;
            title: string;
            description: string;
            default: string;
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
                unsavedConfirmation: string;
                scopeSelectorTitle: string;
                scopeSelectorLabel: string;
                scopeSelectorButton: string;
                newNodeTitle: string;
                newNodeDescription: string;
                newNodeUidLabel: string;
                newNodeUidPlaceholder: string;
                newNodeButton: string;
                newNodeUidAlreadyTaken: string;
                newNodeUidRequired: string;
                newPageTitle: string;
                newPageNameLabel: string;
                newPageNamePlaceholder: string;
                newPageSlugLabel: string;
                newPageSlugPlaceholder: string;
                newPageUidLabel: string;
                newPageUidPlaceholder: string;
                newPageButton: string;
                newPageUidError: string;
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
                insert: string;
                move: string;
                menu: string;
                component: string;
                delete: string;
                edit: string;
                save: string;
                add: string;
                page: string;
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
