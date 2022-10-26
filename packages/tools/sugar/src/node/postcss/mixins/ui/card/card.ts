import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiCardInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.card.defaultLnf'),
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

export interface IPostcssUiCardParams {
    lnf: 'solid';
    scope: ('bare' | 'lnf')[];
}

export { postcssUiCardInterface as interface };

/**
 * @name          menu
 * @namespace     ui.card
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the menu lnf to any .s-menu element
 *
 * @example     css
 * .s-menu {
 *    @sugar.ui.card;
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
    params: Partial<IPostcssUiCardParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiCardParams = {
        lnf: __STheme.get('ui.card.defaultLnf'),
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            display: flex;
            flex-direction: column;
            align-items: center;

            &.s-card--horizontal {
                flex-direction: row;

                @sugar.media mobile {
                    flex-direction: column;
                }
            }
            &.s-card--horizontal-reverse {
                flex-direction: row-reverse;

                @sugar.media mobile {
                    flex-direction: column-reverse;
                }
            }
            &.s-card--vertical-reverse {
                flex-direction: column-reverse;
            }

            .s-card__content {
                align-items: unset;
            }
        `);
    }

    // lnf
    if (finalParams.scope.includes('lnf')) {
        vars.push(`

        `);

        switch (finalParams.lnf) {
            case 'solid':
            default:
                vars.push(`
                    background: sugar.color(base, surface);
                    @sugar.border.radius();
                    @sugar.depth (100);

                    .s-card__img {
                        @sugar.border.radius();
                    }

                    .s-card__content {
                        padding-block: sugar.padding(ui.card.paddingBlock);
                        padding-inline: sugar.padding(ui.card.paddingInline);
                    }
                `);
                break;
        }
    }

    return vars;
}
