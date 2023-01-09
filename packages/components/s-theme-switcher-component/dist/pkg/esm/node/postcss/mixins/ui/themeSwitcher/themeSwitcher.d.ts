import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiThemeSwitcherInterface extends __SInterface {
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
export interface IPostcssUiThemeSwitcherParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiThemeSwitcherInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiThemeSwitcherParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
