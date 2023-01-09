import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiRatingInterface extends __SInterface {
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
export interface IPostcssUiRatingParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiRatingInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiRatingParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
