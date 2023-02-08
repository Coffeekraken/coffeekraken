import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiClipboardCopyInterface extends __SInterface {
    static get _definition(): {
        scope: {
            type: {
                type: string;
                splitChars: string[];
            };
            values: string[];
            default: string[];
        };
    };
}
export interface IPostcssUiClipboardCopyParams {
    scope: ('bare' | 'lnf' | 'theme')[];
}
export { postcssUiClipboardCopyInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiClipboardCopyParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
