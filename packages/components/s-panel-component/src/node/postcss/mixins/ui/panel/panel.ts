import __SInterface from '@coffeekraken/s-interface';

class postcssUiPanelInterface extends __SInterface {
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

export interface IPostcssUiPanelMapParams {
    scope: ('bare' | 'lnf')[];
}

export { postcssUiPanelInterface as interface };

/**
 * @name          panel
 * @namespace     ui.panel
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the panel style to any s-panel element
 *
 * @snippet         @sugar.ui.panel($1);
 *
 * @example     css
 * .s-panel {
 *    @sugar.ui.panel;
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
    params: Partial<IPostcssUiPanelMapParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiPanelMapParams = {
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

            .s-panel_container {
                transition: sugar.theme(ui.panel.transition);
                background: sugar.color(main, background);
                @sugar.depth (ui.panel.depth);
                @sugar.border.radius (ui.panel.borderRadius);
                @sugar.scrollbar;

                @sugar.media <=mobile {
                    width: 90vw;
                    min-width: auto;
                    max-width: auto;
                }
            }

            .s-panel_backdrop {
                background: sugar.color(main, surface, --alpha 0.6);
                transition: sugar.theme(ui.panel.transition);
                @sugar.ui.backdrop;
                z-index: 0;
            }

        `);
    }

    // wireframe
    vars.push(`
        @sugar.wireframe {
            .s-panel_container {
                    @sugar.wireframe.background;
                    @sugar.wireframe.border;
                }
            .s-panel_backdrop {
                background: sugar.color(sugar.wireframe.background(light), --alpha 0.7);

                @sugar.theme.when dark {
                    background: sugar.color(sugar.wireframe.background(dark), --alpha 0.7);
                }
            }
        }
    `);

    return vars;
}
