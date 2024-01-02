import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          blockquote
 * @as          @s.ui.blockquote
 * @namespace     node.mixin.ui.blockquote
 * @type          PostcssMixin
 * @interface     ./blockquote
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "blockquote" UI component css.
 *
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.blockquote
 *
 * @example       css
 * .my-element {
 *      @s.ui.blockquote();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiBlockquoteInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginUiBlockquoteParams {}

export { SSugarcssPluginUiBlockquoteInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiBlockquoteParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiBlockquoteParams = {
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
            @s.scope 'bare' {
                font-size: s.scalable(1rem);
                display: block;
                padding-inline: s.padding(ui.blockquote.paddingInline);
                padding-block: s.padding(ui.blockquote.paddingBlock);
            }
        `);

    vars.push(`
            @s.scope 'lnf' {
                border-inline-start: s.border.width(ui.blockquote.borderWidth) solid s.color(current);
                color: s.color(current, foreground);
                background-color: s.color(main, surface, --alpha 0.5);
                border-radius: s.border.radius();
                @s.font.family(quote);
            }
    `);

    return vars;
}
