import __SInterface from '@coffeekraken/s-interface';

class postcssUiGoogleMapInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}

export interface IPostcssUiGoogleMapParams {
    scope: ('bare' | 'lnf')[];
}

export { postcssUiGoogleMapInterface as interface };

/**
 * @name          googleMap
 * @namespace     ui.googleMap
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the google map style to any s-google-map element
 *
 * @snippet         @sugar.ui.googleMap($1);
 * 
 * @example     css
 * .s-google-map {
 *    @sugar.ui.googleMap;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function ({
    params,
    atRule,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssUiGoogleMapParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiGoogleMapParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            min-width: 20px;
            min-height: 20px;
            position: relative;
    `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            @sugar.border.radius(ui.googleMap.borderRadius);
            @sugar.depth(ui.googleMap.depth);

            div[style*='bottom: 0px;'] {
                * {
                    color: white !important;
                    text-shadow: none !important;
                    background: none !important;
                    opacity: 0.7 !important;
                }
            }

        `);
    }

    return vars;
}
