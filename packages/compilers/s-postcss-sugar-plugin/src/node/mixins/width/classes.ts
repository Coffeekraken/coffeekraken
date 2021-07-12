import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';

/**
 * @name           classes
 * @namespace      node.mixins.width
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the width helper classes like s-width:20, s-width:50, etc...
 * It will generate all the width defined in the config.theme.width configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.width.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginWidthClassesMixinInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginWidthClassesMixinParams {}

export { postcssSugarPluginWidthClassesMixinInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginWidthClassesMixinParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginWidthClassesMixinParams = {
    ...params
  };

  const vars: string[] = [];

  vars.push(`/**
    * @name            s-width:viewport
    * @namespace        sugar.css.width
    * @type             CssClass
    * @platform         css
    * @status         beta
    * 
    * This class allows you to apply the "<yellow>viewport</yellow>" width to any HTMLElement
    * 
    * @example      html
    * <div class="s-container">
    *   <h1 class="s-typo\:h1">Hello world</h1>
    *   <div class="s-width\:viewport">
    *       <p class="s-typo\:p">Something cool</p>
    *   </div>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-width--viewport {
        position: relative;
        left: 50%;
        width: 100vw;
        transform: translate(-50%);
   }`);

   const widthObj = __theme().config('width');
   Object.keys(widthObj).forEach(name => {

      vars.push(`/**
        * @name            s-width:${name}
        * @namespace        sugar.css.width
        * @type             CssClass
        * @platform         css
        * @status           beta
        * 
        * This class allows you to apply the "<yellow>${name}</yellow>" width to any HTMLElement
        * 
        * @example      html
        * <div class="s-container">
        *   <h1 class="s-typo\:h1">Hello world</h1>
        *   <div class="s-width\:${name}">
        *       <p class="s-typo\:p">Something cool</p>
        *   </div>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
      .s-width--${name} {
            width: ${widthObj[name]};
      }`);

   });

  replaceWith(vars);
}
