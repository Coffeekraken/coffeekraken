import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiCardInterface extends __SInterface {
    static get _definition(): {
        direction: {
            type: string;
            values: string[];
            default: string;
        };
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
export interface IPostcssUiCardParams {
    direction: 'vertical' | 'horizontal' | 'vertical-reverse' | 'horizontal-reverse';
    scope: ('bare' | 'lnf' | 'direction')[];
}
export { postcssUiCardInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiCardParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
