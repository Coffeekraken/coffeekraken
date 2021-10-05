import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __faker from 'faker';

/**
 * @name           classes
 * @namespace      node.mixins.typo
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the typo helper classes like s-typo:h1, s-typo:p, and all the typo
 * elements that are defined in the config.theme.typo configuration stack.
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.typo.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginTypoClassesInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginTypoClassesParams {}

export { postcssSugarPluginTypoClassesInterface as interface };

export default function ({
    params,
    atRule,
    jsObjectToCssProperties,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginTypoClassesParams>;
    atRule: any;
    jsObjectToCssProperties: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginTypoClassesParams = {
        ...params,
    };

    const vars: string[] = [];

    const typosObj = __theme().config('typo');

    vars.push(`
      /**
        * @name          Typography
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/typography
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply basic typo styles like \`sub\`, \`strong\`, etc... on any HTMLElement
        * These styles are defined in the \`theme.typo\` theme settings.
        * 
        * @support      chromium        14+
        * @support      firefox         68+    
        * @support      safari          5+
        * @support      edge            17+
        * 
        ${Object.keys(typosObj)
            .map((typoName) => {
                return ` * @cssClass            s-typo:${typoName}          Apply the \`${typoName}\` style`;
            })
            .join('\n')}
        * @cssClass             s-format:text           Format automatically child tags like \`strong\` to the \`s-typo:string\` style
        * @cssClass             s-rhythm:vertical           Apply the vertical rhythm to all direct child tags
        *
        * @example        html
         ${Object.keys(typosObj)
             .map((typoName) => {
                 return ` * <!-- ${typoName} -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${typoName}</h3>
            *   <${typoName} class="s-typo:${typoName}">
            *       ${__faker.name.findName()}
            *   </${typoName}>
            * </div>
            * `;
             })
             .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    Object.keys(typosObj).forEach((typoName) => {
        const typoObj = typosObj[typoName];
        const cls = `s-typo:${typoName}`;

        const css = jsObjectToCssProperties(typoObj, {
            exclude: ['rhythmVertical'],
        });

        vars.push(`/**
            * @name            ${cls}
            * @namespace        sugar.css.typo
            * @type             CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any HTMLElement
            * 
            * @example      html
            * <span class="${cls.replace(':', ':')}">Something cool</span>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        .${cls.replace(':', '--')} {
                ${css}
        }`);

        vars.push(`/**
            * @name            s-format:text ${typoName}
            * @namespace        sugar.css.typo
            * @type             CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any ${typoName} tag in the .s-format:text scope
            * 
            * @example      html
            * <div class="s-format\:text">
            *   <${typoName}>Something cool</${typoName}>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        @sugar.format.text {
            ${typoName} {
                ${css}
            }
        }`);

        vars.push(`/**
            * @name            s-rhythm:vertical .${typoName}, s-rhythm:vertical ${typoName}
            * @namespace        sugar.css.typo
            * @type             CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any ${typoName} tag in the .s-format:text scope
            * 
            * @feature          Vertical rhythm
            * 
            * @example      html
            * <div class="s-format\:text">
            *   <${typoName}>Something cool</${typoName}>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
        @sugar.rhythm.vertical {
            ${typoName}, .${typoName} {
                ${jsObjectToCssProperties(typoObj.rhythmVertical ?? {})}
            }
        }`);
    });

    replaceWith(vars);
}
