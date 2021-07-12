import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';

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
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginTypoClassesParams>;
  atRule: any;
  replaceWith: Function
}) {
  const finalParams: IPostcssSugarPluginTypoClassesParams = {
    ...params
  };

  const vars: string[] = [];

  const typosObj = __theme().config('typo');

  Object.keys(typosObj).forEach((typoName) => {
    const typoObj = typosObj[typoName];
    const cls = `s-typo:${typoName}`;

    const css = __jsObjectToCssProperties(typoObj, {
      exclude: [':rhythm-vertical']
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
    * <span class="${cls.replace(':','\:')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${cls.replace(':','--')} {
        ${css}
   }`);

   if (typoObj[':rhythm-vertical']) {

        vars.push(`

        /**
          * @name         s-rhythm:vertical ${cls}
          * @namespace    sugar.css.typo
          * @type         CssClass
          * @platform     css
          * @status       beta
          * 
          * This class allows you to activate the space(s) on your "<yellow>${cls}</yellow>" HTMLElement
          * 
          * @example      html
          * <div class="s-rhythm\:vertical">
          *     <span class="${cls.replace(':','\:')}">Something cool</span>
          * </div>
          * 
          * @since    2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       @sugar.rhythm.vertical {
        &.${cls}, & .${cls} {
          ${__jsObjectToCssProperties(typoObj[':rhythm-vertical'])}
        }
      }
      `);

    }
  });
  
  replaceWith(vars);
}
