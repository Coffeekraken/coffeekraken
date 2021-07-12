import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';

/**
 * @name           classes
 * @namespace      node.mixins.display
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the display helper classes like s-display:block, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.display.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginDisplayClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginDisplayClassesParams {}

export { postcssSugarPluginDisplayClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginDisplayClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginDisplayClassesParams = {
    ...params
  };

  const vars: string[] = [];

  vars.push(`
        
      /**
       * @name            s-display:block
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform        css
       * @status          beta
       * 
       * This class allows you to apply the value "<yellow>block</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:block">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--block{
          display: block !important;
      }

      /**
       * @name            s-display:inline-block
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>inline-block</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:inline-block">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--inline-block{
          display: inline-block !important;
      }

      /**
       * @name            s-display:contents
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>contents</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:contents">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--contents{
          display: contents !important;
      }

      /**
       * @name            s-display:flex
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>flex</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:flex">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--flex{
          display: flex !important;
      }

      /**
       * @name            s-display:grid
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>grid</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:grid">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--grid{
          display: grid !important;
      }

      /**
       * @name            s-display:inline-flex
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>inline-flex</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:inline-flex">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--inline-flex{
          display: inline-flex !important;
      }

      /**
       * @name            s-display:inline-grid
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>inline-grid</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:inline-grid">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--inline-grid{
          display: inline-grid !important;
      }

      /**
       * @name            s-display:none
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>none</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:none">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--none{
          display: none !important;
      }

  `);

    replaceWith(vars);
}
