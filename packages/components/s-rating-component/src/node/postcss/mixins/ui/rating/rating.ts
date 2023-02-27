import __SInterface from '@coffeekraken/s-interface';

class postcssUiRatingInterface extends __SInterface {
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

export interface IPostcssUiRatingParams {
    scope: ('bare' | 'lnf')[];
}

export { postcssUiRatingInterface as interface };

/**
 * @name          rating
 * @namespace     ui.rating
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the datetime picker style to any s-rating element
 *
 * @snippet         @sugar.ui.rating($1);
 * 
 * @example     css
 * .s-rating {
 *    @sugar.ui.rating;
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
    params: Partial<IPostcssUiRatingParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiRatingParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`

    `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`

            .s-rating_icons-wrapper {
                font-size: sugar.scalable(1em);

                i {
                    padding-inline: 5px;
                }
            }

            .s-rating_base {
                color: sugar.color(main);
            }
            
            .s-rating_rate {
                color: sugar.color(current);
            }

        `);
    }

    return vars;
}
