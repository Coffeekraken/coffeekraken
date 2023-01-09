import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiSliderInterface extends __SInterface {
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
export interface IPostcssUiSliderParams {
    scope: ('bare' | 'lnf' | 'behavior')[];
}
export { postcssUiSliderInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiSliderParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
