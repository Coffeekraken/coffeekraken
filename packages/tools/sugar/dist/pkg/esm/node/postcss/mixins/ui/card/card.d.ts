import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiCardInterface extends __SInterface {
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
export interface IPostcssUiCardParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiCardInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiCardParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
