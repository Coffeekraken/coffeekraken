import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiDatetimePickerInterface extends __SInterface {
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
export interface IPostcssUiDatetimePickerParams {
    scope: ('bare' | 'lnf' | 'theme')[];
}
export { postcssUiDatetimePickerInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiDatetimePickerParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
