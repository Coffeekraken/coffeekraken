import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiColorPickerInterface extends __SInterface {
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
export interface IPostcssUiColorPickerParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiColorPickerInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiColorPickerParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
