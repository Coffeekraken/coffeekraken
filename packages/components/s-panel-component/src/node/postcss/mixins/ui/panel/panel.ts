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
 * @snippet         @s.ui.panel($1);
 *
 * @example     css
 * .s-panel {
 *    @s.ui.panel;
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
                transition: s.theme(ui.panel.transition);
                background: s.color(main, background);
                @s.depth (ui.panel.depth);
                @s.border.radius (ui.panel.borderRadius);
                @s.scrollbar;

                @s.media <=mobile {
                    width: 90vw;
                    min-width: auto;
                    max-width: auto;
                }
            }

            .s-panel_backdrop {
                background: s.color(main, surface, --alpha 0.6);
                transition: s.theme(ui.panel.transition);
                @s.ui.backdrop;
                z-index: 0;
            }

        `);
    }

    // wireframe
    vars.push(`
        @s.wireframe {
            .s-panel_container {
                    @s.wireframe.background;
                    @s.wireframe.border;
                }
            .s-panel_backdrop {
                background: s.color(s.wireframe.background(light), --alpha 0.7);

                @s.theme dark {
                    background: s.color(s.wireframe.background(dark), --alpha 0.7);
                }
            }
        }
    `);

    return vars;
}
