import __SInterface from '@coffeekraken/s-interface';

class postcssUiWysiwygInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiWysiwygParams {}

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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.wysiwyg($1);
 *
 * @example     css
 * .s-wysiwyg {
 *    @s.ui.wysiwyg;
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
        ...params,
    };

    const vars: string[] = [];

    // bare

    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            @s.ui.input();

            .ce-inline-toolbar {
                @s.depth (100);
                padding: s.padding(10);
                @s.border.radius();
            }
        
            .codex-editor__redactor {
                padding-bottom: s.padding(60) !important;
            }
        
            .ce-inline-toolbar__buttons {
                gap: s.margin(10);
        
                button {
                    padding: s.padding(10) s.padding(20);
                    border: 1px solid s.color(main, --alpha 0.1);
                    @s.transition (fast);
                    @s.border.radius;
        
                    &:not(._color) {
                        background: s.color(accent, --alpha 0);
                    }
        
                    &._color {
                    }
        
                    &._color:hover,
                    &._color.active {
                        background: var(--s-wysiwyg-color);
                        color: s.color(main, foreground);
                    }
        
                    &:not(._color):hover {
                        background: s.color(main, --alpha 0.3);
                    }
                    &:not(._color).active {
                        background: s.color(main);
                        color: s.color(main, foreground);
        
                        * {
                            fill: s.color(main, foreground);
                        }
                        *[stroke] {
                            stroke: s.color(main, foreground);
                        }
                    }
                }
            }

        `);
    vars.push('}');

    return vars;
}
