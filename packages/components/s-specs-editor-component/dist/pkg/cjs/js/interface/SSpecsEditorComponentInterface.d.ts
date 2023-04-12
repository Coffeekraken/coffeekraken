import __SInterface from '@coffeekraken/s-interface';

export default class SSpecsEditorComponentInterface extends __SInterface {
    static get _definition(): {
        id: {
            type: string;
            title: string;
            description: string;
        };
        values: {
            type: string;
            title: string;
            description: string;
            required: boolean;
        };
        specs: {
            type: string;
            title: string;
            description: string;
            required: boolean;
        };
        source: {
            type: string;
            description: string;
        };
        frontspec: {
            type: string;
            title: string;
            description: string;
        };
        media: {
            type: string;
            title: string;
            description: string;
        };
        defaultMedia: {
            type: string;
            title: string;
            description: string;
        };
        features: {
            type: string;
            description: string;
            default: {
                save: boolean;
                delete: boolean;
                upload: boolean;
                media: boolean;
            };
        };
        ghostSpecs: {
            type: string;
            description: string;
            default: boolean;
        };
        i18n: {
            type: string;
            title: string;
            description: string;
            default: {
                image: {
                    copyUrl: string;
                };
                video: {
                    copyUrl: string;
                };
            };
        };
        icons: {
            type: string;
            title: string;
            description: string;
            default: {
                clear: string;
                add: string;
                delete: string;
                expand: string;
                collapse: string;
                copy: string;
                remove: string;
                success: string;
                mobile: string;
                tablet: string;
                desktop: string;
                wide: string;
                up: string;
                down: string;
                left: string;
                right: string;
                reorder: string;
                repeatableEmpty: string;
            };
        };
    };
}
