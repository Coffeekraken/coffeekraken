import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';

/**
 * @name           classes
 * @namespace      node.mixin.depth
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate all the depth helper classes like s-depth:20, etc...
 *
 * @return        {Css}        The generated css
 *
 * @example        css
 * \@sugar.depth.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginDepthClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginDepthClassesParams {}

export { postcssSugarPluginDepthClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginDepthClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginDepthClassesParams = {
        ...params,
    };

    const depthsObj = __STheme.get('depth');
    const depthsArray = __keysFirst(Object.keys(depthsObj), ['default']);

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Depth
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/depth
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some depth shadows to any HTMLElement.
        * These depths are defined in the theme configuration under \`theme.depth\` namespace.
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${depthsArray
            .map((depthName) => {
                return [
                    ` * @cssClass          s-depth:${depthName}      Apply the depth ${depthName} to any HTMLElement`,
                    ` * @cssClass          s-depth:text:${depthName}      Apply the text depth ${depthName} to any HTMLElement`,
                    ` * @cssClass          s-depth:box:${depthName}      Apply the depth ${depthName} to any HTMLElement`,
                ].join('\n');
            })
            .join('\n')}
        *
        ${depthsArray
            .map((depthName) => {
                return ` * @example          html        Depth ${depthName}
                <div class="s-depth:${depthName} s-bg:main s-text:center s-radius s-p:30">
                    <span class="s-depth:text:${depthName}">s-depth:${depthName}</span>
                </div>`;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    depthsArray.forEach((depthName) => {
        vars.comment(
            () => `/**
                * @name          s-depth:${
                    depthName === 'default' ? '' : depthName
                }
                * @namespace          sugar.css.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any HTMLElement
                * 
                * @example        html
                * <a class="s-btn s-btn--primary s-depth:${
                    depthName === 'default' ? '' : depthName
                }">I'm a cool depth button</a>
                */
                `,
        ).code(`
.s-depth${depthName === 'default' ? '' : `--${depthName}`}:not(.s-depth--text),
.s-depth--box.s-depth--${depthName === 'default' ? '' : `--${depthName}`} {
    @sugar.depth('${depthName}');
}`);
    });

    depthsArray.forEach((depthName) => {
        vars.comment(
            () => `/**
                * @name          s-depth:text:${
                    depthName === 'default' ? '' : depthName
                }
                * @namespace          sugar.css.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any text
                * 
                * @example        html
                * <a class="s-btn s-btn--primary s-depth:text:${
                    depthName === 'default' ? '' : depthName
                }">I'm a cool depth button</a>
                */
                `,
        ).code(`
.s-depth--text.s-depth${depthName === 'default' ? '' : `--${depthName}`} {
    @sugar.depth(${depthName}, $type: text);
}`);
    });

    return vars;
}
