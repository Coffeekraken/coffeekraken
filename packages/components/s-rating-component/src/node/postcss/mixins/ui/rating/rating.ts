import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiRatingInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.rating.defaultStyle'),
            },
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
    style: 'solid';
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
        style: __STheme.get('ui.rating.defaultStyle'),
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

            .s-rating__icons-wrapper {
                font-size: sugar.scalable(1em);

                i {
                    padding-inline: 5px;
                }
            }

            .s-rating__base {
                color: sugar.color(main);
            }
            
            .s-rating__rate {
                color: sugar.color(current);
            }

        `);

        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
        `);
                break;
        }
    }

    return vars;
}
