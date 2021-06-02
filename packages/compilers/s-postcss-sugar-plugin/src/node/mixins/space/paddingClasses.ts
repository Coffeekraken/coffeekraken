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
    const clsPadding = `s-padding-${spaceName}`;
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
   .${clsPadding} {
        padding: sugar.space(${spaceName});
   }`);
    const clsPaddingTop = `s-padding-top-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingTop}
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
   .${clsPaddingTop} {
        padding-top: sugar.space(${spaceName});
   }`);
    const clsPaddingBottom = `s-padding-bottom-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingBottom}
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
   .${clsPaddingBottom} {
        padding-bottom: sugar.space(${spaceName});
   }`);
    const clsPaddingLeft = `s-padding-left-${spaceName}`;
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
   .${clsPaddingLeft} {
        padding-left: sugar.space(${spaceName});
   }`);
    const clsPaddingRight = `s-padding-right-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingRight}
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
   .${clsPaddingRight} {
        padding-right: sugar.space(${spaceName});
   }`);
    const clsPaddingX = `s-padding-x-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingX}
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
   .${clsPaddingX} {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
   }`);
    const clsPaddingY = `s-padding-y-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingY}
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
   .${clsPaddingY} {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
   }`);
  });

  replaceWith(vars);
}
