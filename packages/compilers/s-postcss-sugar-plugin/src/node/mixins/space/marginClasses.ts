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
    const clsMargin = `s-m--${spaceName}`;
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
   .${clsMargin} {
        margin: sugar.space(${spaceName});
   }`);
    const clsMarginTop = `s-mt--${spaceName}`;
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
   .${clsMarginTop} {
        margin-top: sugar.space(${spaceName}) !important;
   }`);
    const clsMarginBottom = `s-mb--${spaceName}`;
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
   .${clsMarginBottom} {
        margin-bottom: sugar.space(${spaceName}) !important;
   }`);
    const clsMarginLeft = `s-ml--${spaceName}`;
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
   .${clsMarginLeft} {
        margin-left: sugar.space(${spaceName}) !important;
   }`);
    const clsMarginRight = `s-mr--${spaceName}`;
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
   .${clsMarginRight} {
        margin-right: sugar.space(${spaceName}) !important;
   }`);
    const clsMarginX = `s-mx--${spaceName}`;
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
     .${clsMarginX} {
        margin-left: sugar.space(${spaceName}) !important;
        margin-right: sugar.space(${spaceName}) !important;
   }`);
    const clsMarginY = `s-my--${spaceName}`;
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
   .${clsMarginY} {
        margin-top: sugar.space(${spaceName}) !important;
        margin-bottom: sugar.space(${spaceName}) !important;
   }`);
  });

  vars.push(`/**
    * @name            s-m--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-m--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-m--auto {
        margin: auto;
   }`);

   vars.push(`/**
    * @name            s-mt--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mt--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mt--auto {
        margin-top: auto;
   }`);

   vars.push(`/**
    * @name            s-mr--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mr--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mr--auto {
        margin-right: auto;
   }`);

   vars.push(`/**
    * @name            s-mb--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mb--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mb--auto {
        margin-bottom: auto;
   }`);

   vars.push(`/**
    * @name            s-left--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-left--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-left--auto {
        margin-left: auto;
   }`);

   vars.push(`/**
    * @name            s-mx--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mx--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mx--auto {
        margin-left: auto;
        margin-right: auto;
   }`);

   vars.push(`/**
    * @name            s-my--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-my--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-my--auto {
        margin-top: auto;
        margin-bottom: auto;
   }`);

  replaceWith(vars);
}
