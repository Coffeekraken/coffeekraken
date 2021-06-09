import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

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

  const spacesObj = __theme().config('space');

  Object.keys(spacesObj).forEach((spaceName) => {
    // paddings
    const clsPadding = `s-pd:${spaceName}`;
    vars.push(`/**
    * @name            ${clsPadding}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" padding style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsPadding}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsPadding}"] {
        padding: sugar.space(${spaceName});
   }`);
    const clsPaddingTop = `s-pt:${spaceName}`;
    vars.push(`/**
    * @name            ${clsPaddingTop}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" top padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingTop}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsPaddingTop}"] {
        padding-top: sugar.space(${spaceName});
   }`);
    const clsPaddingBottom = `s-pb:${spaceName}`;
    vars.push(`/**
    * @name            ${clsPaddingBottom}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" bottom padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingBottom}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsPaddingBottom}"] {
        padding-bottom: sugar.space(${spaceName});
   }`);
    const clsPaddingLeft = `s-pl:${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingLeft}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" left padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingLeft}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsPaddingLeft}"] {
        padding-left: sugar.space(${spaceName});
   }`);
    const clsPaddingRight = `s-pr:${spaceName}`;
    vars.push(`/**
    * @name            ${clsPaddingRight}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" right padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingRight}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsPaddingRight}"] {
        padding-right: sugar.space(${spaceName});
   }`);
    const clsPaddingX = `s-px:${spaceName}`;
    vars.push(`/**
    * @name            ${clsPaddingX}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" left and right padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingX}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsPaddingX}"] {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
   }`);
    const clsPaddingY = `s-py:${spaceName}`;
    vars.push(`/**
    * @name            ${clsPaddingY}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" top and bottom padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingY}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   [class*="${clsPaddingY}"] {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
   }`);
  });

  replaceWith(vars);
}
