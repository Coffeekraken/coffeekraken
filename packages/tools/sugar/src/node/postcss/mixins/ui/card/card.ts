import __SInterface from '@coffeekraken/s-interface';

class postcssUiCardInterface extends __SInterface {
    static get _definition() {
        return {
            direction: {
                type: 'String',
                values: [
                    'vertical',
                    'horizontal',
                    'vertical-reverse',
                    'horizontal-reverse',
                ],
                default: 'vertical',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'direction'],
                default: ['bare', 'lnf', 'direction'],
            },
        };
    }
}

export interface IPostcssUiCardParams {
    direction:
        | 'vertical'
        | 'horizontal'
        | 'vertical-reverse'
        | 'horizontal-reverse';
    scope: ('bare' | 'lnf' | 'direction')[];
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
        direction: 'vertical',
        scope: ['bare', 'lnf', 'direction'],
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
                
            }
            &.s-card--horizontal-reverse {
                
            }
            &.s-card--vertical-reverse {
                
            }

            ._content {
                align-items: unset;
            }

            ._ctas {
                display: flex;
            }

        `);
    }

    // direction
    if (finalParams.scope.indexOf('direction') !== -1) {
        switch (finalParams.direction) {
            case 'horizontal-reverse':
                vars.push(`
                    flex-direction: row-reverse;
                    max-width: none;

                    ._media {
                        align-self: stretch;
                        width: 50%;
                    }
                    ._img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    @sugar.media mobile {
                        flex-direction: column-reverse;
                    }
                `);
                break;
            case 'horizontal':
                vars.push(`
                    flex-direction: row;
                    max-width: none;
                    
                    ._media {
                        align-self: stretch;
                        width: 50%;
                    }
                    ._img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    @sugar.media mobile {
                        flex-direction: column;
                    }
            `);

                break;
            case 'vertical-reverse':
                vars.push(`
                    flex-direction: column-reverse;
                    align-items: flex-start;
                `);
                break;
            default:
            case 'vertical':
                vars.push(
                    `
                        align-items: flex-start;
                    `,
                );
                break;
        }
    }

    // lnf
    if (finalParams.scope.includes('lnf')) {
        vars.push(`
            background: sugar.color(main, surface);
            @sugar.border.radius(ui.card.borderRadius);
            @sugar.depth (ui.card.depth);

            ._media {
                @sugar.border.radius(ui.card.borderRadius);
            }

            ._img {
                @sugar.border.radius(ui.card.borderRadius);
            }

            ._content {
                padding-block: sugar.padding(ui.card.paddingBlock);
                padding-inline: sugar.padding(ui.card.paddingInline);
            }
        `);
    }

    // wireframe
    vars.push(`
        @sugar.wireframe {
            @sugar.wireframe.background;
            @sugar.wireframe.border;
        }
    `);

    return vars;
}
