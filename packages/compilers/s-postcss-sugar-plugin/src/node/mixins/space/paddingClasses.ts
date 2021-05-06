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
  processNested
}: {
  params: Partial<IPostcssSugarPluginPaddingClassesParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginPaddingClassesParams = {
    ...params
  };

  const vars: string[] = [];

  const spacesObj = __theme().config('space');

  Object.keys(spacesObj).forEach((spaceName) => {
    // paddings
    const clsPadding = `s-pad-${spaceName}`;
    vars.push(`/**
    * @name            ${clsPadding}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" padding style around any HTMLElement
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
    const clsPaddingTop = `s-pad-top-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingTop}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top padding style to any HTMLElement
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
    const clsPaddingBottom = `s-pad-bottom-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingBottom}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" bottom padding style to any HTMLElement
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
    const clsPaddingLeft = `s-pad-left-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingLeft}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left padding style to any HTMLElement
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
    const clsPaddingRight = `s-pad-right-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingRight}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" right padding style to any HTMLElement
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
    const clsPaddingX = `s-pad-x-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingX}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left and right padding style to any HTMLElement
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
    const clsPaddingY = `s-pad-y-${spaceName}`;
    vars.push(`/**
    * @name            .${clsPaddingY}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top and bottom padding style to any HTMLElement
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

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
