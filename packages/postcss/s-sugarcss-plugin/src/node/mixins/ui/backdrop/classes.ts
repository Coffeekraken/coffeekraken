import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          classes
 * @as          @s.ui.backdrop.classes
 * @namespace     node.mixin.ui.backdrop
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the backdrop classes
 *
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.backdrop.classes
 *
 * @example       css
 * @s.ui.backdrop.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiBackdropClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginUiBackdropClassesParams {}

export { SSugarcssPluginUiBackdropClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiBackdropClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiBackdropClassesParams = {
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Backdrop
        * @namespace          sugar.style.ui.backdrop
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/backdrop
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice backdrop with simple class.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.backdrop.classes;
        * 
        * .my-backdrop {
        *   @s.ui.backdrop;
        * }
        * 
        * @cssClass                 s-backdrop          Apply the backdrop styling
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    ).code(`
            .s-backdrop {
                @s.ui.backdrop;
            }
    `);

    return vars;
}
