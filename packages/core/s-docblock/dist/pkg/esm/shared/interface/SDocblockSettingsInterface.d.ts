import __SInterface from '@coffeekraken/s-interface';

export default class SDocblockSettingsInterface extends __SInterface {
    static get _definition(): {
        filePath: {
            description: string;
            type: string;
        };
        filter: {
            description: string;
            type: string;
        };
        filterByTag: {
            description: string;
            type: string;
            default: {};
        };
        renderMarkdown: {
            description: string;
            type: string;
            default: boolean;
        };
        markedOptions: {
            description: string;
            type: string;
            default: {};
        };
    };
}
