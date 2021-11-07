import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name           classes
 * @namespace      node.mixins.scale
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the scale helper classes like s-scale:01, s-scale:12, etc.
 * The generated scales are specified in the config.theme.scale configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.scale.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginScaleClassesInterface extends __SInterface {
    static get definition() {
        return {};
    }
}

export interface IPostcssSugarPluginScaleClassesParams {}

export { postcssSugarPluginScaleClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginScaleClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginScaleClassesParams = {
        ...params,
    };

    const scaleObj = __STheme.config('ui.scrollbar');

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Scrollbar
        * @namespace          sugar.css.tools
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/scrollbar
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply a custom scrollbar that follows your theme settings.
        * It is based on the \`theme.ui.scrollbar\` settings.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass     s-scrollbar         Apply the custom scrollbar
        * 
        * @example        html
        * <!-- scrollbar vertical -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30"><Vertical</h3>
        *   <div class="s-scrollbar" style="height:50px; overflow: auto;">
        *       ${[...Array(20)].map((l) => `${__faker.name.findName()}<br>`)}
        *   </div>
        * </div>
        * 
        * <!-- scrollbar orizontal -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30"><Horizontal</h3>
        *   <div class="s-scrollbar" style="white-space:nowrap; height: 30px; overflow: auto;">
        *       ${__faker.lorem.paragraphs(3)}
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    vars.push(`/**
            * @name          s-scrollbar
            * @namespace          sugar.css.scrollbar
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
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
            .s-scrollbar {
                @sugar.scrollbar();
            }`);

    return vars;
}
