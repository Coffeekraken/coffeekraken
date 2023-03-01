import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiPanelInterface extends __SInterface {
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
export interface IPostcssUiPanelMapParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiPanelInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiPanelMapParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
