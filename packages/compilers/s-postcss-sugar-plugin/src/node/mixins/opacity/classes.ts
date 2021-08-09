import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

/**
 * @name           classes
 * @namespace      node.mixins.margin
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the margin helper classes like s-m:10, s-mr:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.margin.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginOpacityClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginOpacityClassesParams {}

export { postcssSugarPluginOpacityClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginOpacityClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginOpacityClassesParams = {
    ...params
  };

  const vars: string[] = [];

  const opacityObj = __theme().config('opacity');

  Object.keys(opacityObj).forEach((opacity) => {

    const opacityCls = `s-opacity:${opacity}`;
    vars.push(`/**
    * @name            ${opacityCls}
    * @namespace        sugar.css.opacity
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${opacity}</yellow>" opacity style around any HTMLElement
    * 
    * @example      html
    * <span class="${opacityCls.replace(':','\:')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${opacityCls.replace(':','--')} {
        opacity: sugar.opacity(${opacity});
   }`);
  });

  replaceWith(vars);
}
