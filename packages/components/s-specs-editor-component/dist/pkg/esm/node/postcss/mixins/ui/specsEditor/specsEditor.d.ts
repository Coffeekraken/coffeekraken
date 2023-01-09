import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiSpecsEditorInterface extends __SInterface {
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
export interface IPostcssUiSpecsEditorParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiSpecsEditorInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiSpecsEditorParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
