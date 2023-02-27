import __SInterface from '@coffeekraken/s-interface';

class postcssUiCardInterface extends __SInterface {
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

export interface IPostcssUiCardParams {
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
 * @snippet         @sugar.ui.card
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
            max-width: 500px;

            &.s-card--horizontal {
                flex-direction: row;
                max-width: none;
                
                .s-card_media {
                    align-self: stretch;
                    width: 50%;
                }
                .s-card_img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                @sugar.media mobile {
                    flex-direction: column;
                }
            }
            &.s-card--horizontal-reverse {
                flex-direction: row-reverse;
                max-width: none;

                .s-card_media {
                    align-self: stretch;
                    width: 50%;
                }
                .s-card_img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                @sugar.media mobile {
                    flex-direction: column-reverse;
                }
            }
            &.s-card--vertical-reverse {
                flex-direction: column-reverse;
            }

            .s-card_content {
                align-items: unset;
            }
        `);
    }

    // lnf
    if (finalParams.scope.includes('lnf')) {
        vars.push(`
            background: sugar.color(base, surface);
            @sugar.border.radius(ui.card.borderRadius);
            @sugar.depth (ui.card.depth);

            .s-card_media {
                @sugar.border.radius(ui.card.borderRadius);
            }

            .s-card_img {
                @sugar.border.radius(ui.card.borderRadius);
            }

            .s-card_content {
                padding-block: sugar.padding(ui.card.paddingBlock);
                padding-inline: sugar.padding(ui.card.paddingInline);
            }
        `);
    }

    return vars;
}
