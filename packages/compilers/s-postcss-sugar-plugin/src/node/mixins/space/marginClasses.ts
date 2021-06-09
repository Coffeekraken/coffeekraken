import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';

class postcssSugarPluginMarginClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginMarginClassesParams {}

export { postcssSugarPluginMarginClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginMarginClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginMarginClassesParams = {
    ...params
  };

  const vars: string[] = [];

  const spacesObj = __theme().config('space');

  Object.keys(spacesObj).forEach((spaceName) => {
    // margins
    const clsMargin = `s-m:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsMargin}"] {
        margin: sugar.space(${spaceName});
   }`);
    const clsMarginTop = `s-mt:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsMarginTop}"] {
        margin-top: sugar.space(${spaceName});
   }`);
    const clsMarginBottom = `s-mb:${spaceName}`;
    vars.push(`/**
    * @name            .${clsMarginBottom}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" bottom margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsMarginBottom}"] {
        margin-bottom: sugar.space(${spaceName});
   }`);
    const clsMarginLeft = `s-ml:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsMarginLeft}"] {
        margin-left: sugar.space(${spaceName});
   }`);
    const clsMarginRight = `s-mr:${spaceName}`;
    vars.push(`/**
    * @name            .${clsMarginRight}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" right margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsMarginRight}"] {
        margin-right: sugar.space(${spaceName});
   }`);
    const clsMarginX = `s-mx:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left and right margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
     [class*="${clsMarginX}"] {
        margin-left: sugar.space(${spaceName});
        margin-right: sugar.space(${spaceName});
   }`);
    const clsMarginY = `s-my:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top and bottom margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsMarginY}"] {
        margin-top: sugar.space(${spaceName});
        margin-bottom: sugar.space(${spaceName});
   }`);
  });

  replaceWith(vars);
}
