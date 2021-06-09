import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';

class postcssSugarPluginTextClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginTextClassesParams {}

export { postcssSugarPluginTextClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginTextClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginTextClassesParams = {
    ...params
  };

  const vars: string[] = [];

  // align
  vars.push(`
    @sugar.scope(bare) {

        /**
         * @name            s-text:left
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * 
         * This class allows you to align text to the left side
         * 
         * @example     html
         * <div class="s-text:left">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        [class*="s-text"][class*=":left"] {
            text-align: left;
        }

       /**
         * @name            s-text:right
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * 
         * This class allows you to align text to the right side
         * 
         * @example     html
         * <div class="s-text:right">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        [class*="s-text"][class*=":right"] {
            text-align: right;
        }

        /**
         * @name            s-text:center
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * 
         * This class allows you to align text to the center
         * 
         * @example     html
         * <div class="s-text:center">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        [class*="s-text"][class*=":center"] {
            text-text: center;
        }
    }
  `);


  replaceWith(vars);
}
