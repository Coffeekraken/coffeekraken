import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name           classes
 * @as              @sugar.scrollbar.classes
 * @namespace      node.mixin.scale
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the scale helper classes like s-scale:01, s-scale:12, etc.
 * The generated scales are specified in the config.theme.scale configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.scrollbar.classes
 *
 * @example        css
 * \@sugar.scale.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginScaleClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginScaleClassesParams {}

export { postcssSugarPluginScaleClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginScaleClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginScaleClassesParams = {
        ...params,
    };

    const scaleObj = __STheme.get('ui.scrollbar');

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Scrollbar
        * @namespace          sugar.style.tools
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/scrollbar
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply a custom scrollbar that follows your theme settings.
        * It is based on the \`theme.ui.scrollbar\` settings.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.scrollbar.classes;
        * 
        * .my-element {
        *   \\@sugar.scrollbar.hide;
        *   \\@sugar.scrollbar;
        * } 
        * 
        * @cssClass     s-scrollbar         Apply the custom scrollbar
        * 
        * @example        html          Vertical scrollbar
        * <!-- scrollbar vertical -->
        *   <div class="s-scrollbar" style="height:100px; overflow-y: auto;">
        *       ${__faker.lorem.paragraphs(10)}
        *   </div>
        * 
        * @example        html          Horizontal scrollbar
        *   <div class="s-scrollbar" style="white-space:nowrap; width: 200px; height: 2em; overflow-x: auto; overflow-y: hidden;">
        *       ${__faker.lorem.paragraphs(1)}
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.comment(
        () => `/**
            * @name          s-scrollbar
            * @namespace          sugar.style.scrollbar
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows to apply the custom scrollbar on any HTMLElement.
            * This scrollbar is defined in the \`theme.ui.scrollbar\` settings.
            * 
            * @example        html
            * <div class="s-scrollbar" style="height:50px">
            *    ${__faker.lorem.paragraphs(3)}
            * </div>
            * 
            * since           2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
    ).code(
        `
            .s-scrollbar {
                @sugar.scrollbar();
            }`,
        { type: 'CssClass' },
    );

    return vars;
}
