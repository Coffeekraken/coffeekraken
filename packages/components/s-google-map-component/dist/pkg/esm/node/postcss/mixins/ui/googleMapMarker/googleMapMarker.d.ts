import __SInterface from '@coffeekraken/s-interface';
declare class postcssUiGoogleMapMarkerInterface extends __SInterface {
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
export interface IPostcssUiGoogleMapMarkerParams {
    scope: ('bare' | 'lnf')[];
}
export { postcssUiGoogleMapMarkerInterface as interface };

export default function ({ params, atRule, sharedData, replaceWith, }: {
    params: Partial<IPostcssUiGoogleMapMarkerParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}): string[];
