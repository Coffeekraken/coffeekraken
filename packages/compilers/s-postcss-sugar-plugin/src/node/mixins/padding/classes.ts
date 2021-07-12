import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

/**
 * @name           classes
 * @namespace      node.mixins.padding
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the padding helper classes like s-p:10, s-pr:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.padding.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginPaddingClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginPaddingClassesParams {}

export { postcssSugarPluginPaddingClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginPaddingClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginPaddingClassesParams = {
    ...params
  };

  const vars: string[] = [];

  const marginsObj = __theme().config('padding');

  Object.keys(marginsObj).forEach((spaceName) => {
    // margins
    const clsMargin = `s-p:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" padding style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin.replace(':','\:')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMargin.replace(':','--')} {
        padding: sugar.space(${spaceName});
   }`);
    const clsMarginTop = `s-pt:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop.replace(':','\:')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginTop.replace(':','--')} {
        padding-top: sugar.space(${spaceName}) !important;
   }`);
    const clsMarginBottom = `s-pb:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMarginBottom}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" bottom padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom.replace(':','\:')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginBottom.replace(':','--')} {
        padding-bottom: sugar.space(${spaceName}) !important;
   }`);
    const clsMarginLeft = `s-pl:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft.replace(':','\:')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginLeft.replace(':','--')} {
        padding-left: sugar.space(${spaceName}) !important;
   }`);
    const clsMarginRight = `s-pr:${spaceName}`;
    vars.push(`/**
    * @name            .${clsMarginRight}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" right padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight.replace(':','\:')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginRight.replace(':','--')} {
        padding-right: sugar.space(${spaceName}) !important;
   }`);
    const clsMarginX = `s-px:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left and right padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX.replace(':','\:')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
     .${clsMarginX.replace(':','--')} {
        padding-left: sugar.space(${spaceName}) !important;
        padding-right: sugar.space(${spaceName}) !important;
   }`);
    const clsMarginY = `s-py:${spaceName}`;
    vars.push(`/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top and bottom padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY.replace(':','\:')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginY.replace(':','--')} {
        padding-top: sugar.space(${spaceName}) !important;
        padding-bottom: sugar.space(${spaceName}) !important;
   }`);
  });

  replaceWith(vars);
}
