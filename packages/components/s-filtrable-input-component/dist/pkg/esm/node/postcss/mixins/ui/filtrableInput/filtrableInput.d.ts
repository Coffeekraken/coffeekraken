import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiFiltrableInputInterface extends __SInterface {
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
export interface IPostcssUiFiltrableInputParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiFiltrableInputInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiFiltrableInputParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
