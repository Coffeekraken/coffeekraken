import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiWysiwygInterface extends __SInterface {
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
export interface IPostcssUiWysiwygParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiWysiwygInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiWysiwygParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
