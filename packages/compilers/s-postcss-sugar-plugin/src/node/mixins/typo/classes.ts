import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';

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
    const cls = `s-typo--${typoName}`;

    const css = __jsObjectToCssProperties(typoObj, {
      exclude: [':rhythm-vertical']
    });

    vars.push(`/**
    * @name            .${cls}
    * @namespace        sugar.css.typo
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any HTMLElement
    * 
    * @example      html
    * <span class="${cls}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${cls} {
        ${css}
   }`);

   if (typoObj[':rhythm-vertical']) {

        vars.push(`

        /**
          * @name         .${cls}
          * @namespace    sugar.css.typo
          * @type         CssClass
          * @scope        .s-rhythm-vertical
          * 
          * This class allows you to activate the space(s) on your "<yellow>${cls}</yellow>" HTMLElement
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
