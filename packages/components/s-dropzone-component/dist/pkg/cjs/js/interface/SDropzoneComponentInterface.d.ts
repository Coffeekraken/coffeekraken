import __SInterface from '@coffeekraken/s-interface';

export default class SDropzoneComponentInterface extends __SInterface {
    static get _definition(): {
        maxFiles: {
            type: string;
            description: string;
            default: number;
        };
        maxSize: {
            type: string;
            description: string;
        };
        files: {
            type: {
                type: string;
                splitChars: string[];
            };
            description: string;
        };
        accept: {
            type: {
                type: string;
                splitChars: string[];
            };
            description: string;
        };
        input: {
            type: string;
            description: string;
            default: boolean;
        };
        name: {
            type: string;
            description: string;
            default: string;
        };
        upload: {
            type: string;
            description: string;
            default: boolean;
        };
        uploadUrl: {
            type: string;
            description: string;
            default: string;
        };
        errorTimeout: {
            type: string;
            description: string;
            default: number;
        };
        helpIcon: {
            type: string;
            description: string;
            default: string;
        };
        dropFileIcon: {
            type: string;
            description: string;
            default: string;
        };
        i18n: {
            type: string;
            description: string;
            default: {
                clickOrDrag: string;
            };
        };
    };
}
