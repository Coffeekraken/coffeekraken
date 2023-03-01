import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiGoogleMapInterface extends __SInterface {
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
export interface IPostcssUiGoogleMapParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiGoogleMapInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiGoogleMapParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
