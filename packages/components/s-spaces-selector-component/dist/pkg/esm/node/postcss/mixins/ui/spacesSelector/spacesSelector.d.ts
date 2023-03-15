import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiSpacesSelectorInterface extends __SInterface {
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
export interface IPostcssUiSpacesSelectorParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiSpacesSelectorInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiSpacesSelectorParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
