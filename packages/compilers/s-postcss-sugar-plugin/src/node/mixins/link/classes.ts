import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @namespace      node.mixin.link
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the height helper classes like s-link:stretch, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.link.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginLinkClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginLinkClassesMixinParams {}

export { postcssSugarPluginLinkClassesMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginLinkClassesMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginLinkClassesMixinParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
        /**
        * @name          Link
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/link
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some link styling utils to any HTMLElement.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass             s-link:stretch                  Stretch a link clickable area without changing his actual size and style
        * 
        * @example          html            Stretch
        * <div class="s-position:relative s-bg:main s-radius s-p:50">
        *   <a href="#" class="s-link:stretch s-bg:accent s-radius s-p:20">I'm a stretched link!</a>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.comment(
        () => `/**
        * @name            s-link:stretch
        * @namespace        sugar.css.link
        * @type             CssClass
        * @platform         css
        * @status         beta
        * 
        * This class allows you to apply the "<yellow>stretch</yellow>" link style to any HTMLElement
        * 
        * @example      html
        * <div class="s-position:relative s-bg:main s-radius s-p:50">
        *   <a href="#" class="s-link:stretch s-bg:accent s-radius s-p:20">I'm a stretched link!</a>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    ).code(
        () => `
        .s-link--stretch {
            @sugar.link.stretch;
        }
    `,
    );

    return vars;
}
