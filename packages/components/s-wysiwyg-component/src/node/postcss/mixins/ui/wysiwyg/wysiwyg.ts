import __SInterface from '@coffeekraken/s-interface';

class postcssUiWysiwygInterface extends __SInterface {
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

export interface IPostcssUiWysiwygParams {
    scope: ('bare' | 'lnf')[];
}

export { postcssUiWysiwygInterface as interface };

/**
 * @name          wysiwyg
 * @namespace     ui.wysiwyg
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 * @private
 *
 * Apply the wysiwyg style to any s-wysiwyg element
 *
 * @snippet         @sugar.ui.wysiwyg($1);
 *
 * @example     css
 * .s-wysiwyg {
 *    @sugar.ui.wysiwyg;
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
    params: Partial<IPostcssUiWysiwygParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiWysiwygParams = {
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
            @sugar.ui.input();

            .ce-inline-toolbar {
                @sugar.depth (100);
                padding: sugar.padding(10);
                @sugar.border.radius();
            }
        
            .codex-editor__redactor {
                padding-bottom: sugar.padding(60) !important;
            }
        
            .ce-inline-toolbar__buttons {
                gap: sugar.margin(10);
        
                button {
                    padding: sugar.padding(10) sugar.padding(20);
                    border: 1px solid sugar.color(main, --alpha 0.1);
                    @sugar.transition (fast);
                    @sugar.border.radius;
        
                    &:not(._color) {
                        background: sugar.color(accent, --alpha 0);
                    }
        
                    &._color {
                    }
        
                    &._color:hover,
                    &._color.active {
                        background: var(--s-wysiwyg-color);
                        color: sugar.color(main, foreground);
                    }
        
                    &:not(._color):hover {
                        background: sugar.color(main, --alpha 0.3);
                    }
                    &:not(._color).active {
                        background: sugar.color(main);
                        color: sugar.color(main, foreground);
        
                        * {
                            fill: sugar.color(main, foreground);
                        }
                        *[stroke] {
                            stroke: sugar.color(main, foreground);
                        }
                    }
                }
            }

        `);
    }

    return vars;
}
