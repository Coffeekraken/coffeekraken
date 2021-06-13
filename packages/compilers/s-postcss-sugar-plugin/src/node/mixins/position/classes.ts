import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';

class postcssSugarPluginPositionClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginPositionClassesParams {}

export { postcssSugarPluginPositionClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginPositionClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginPositionClassesParams = {
    ...params
  };

  const vars: string[] = [];

  vars.push(`

    @sugar.scope(bare) {
        
        /**
         * @name            s-position--absolute
         * @namespace       sugar.css.mixins.position
         * @type            CssClass
         * 
         * This class allows you to apply the value "<yellow>absolute</yellow>" to the position property on any HTMLElement
         * 
         * @example     html
         * <div class="s-position--absolute">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-position--absolute{
            position: absolute !important;
        }

        /**
         * @name            s-position--relative
         * @namespace       sugar.css.mixins.position
         * @type            CssClass
         * 
         * This class allows you to apply the value "<yellow>relative</yellow>" to the position property on any HTMLElement
         * 
         * @example     html
         * <div class="s-position--relative">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-position--relative{
            position: relative !important;
        }

        /**
         * @name            s-position--fixed
         * @namespace       sugar.css.mixins.position
         * @type            CssClass
         * 
         * This class allows you to apply the value "<yellow>fixed</yellow>" to the position property on any HTMLElement
         * 
         * @example     html
         * <div class="s-position--fixed">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-position--fixed{
            position: fixed !important;
        }

        /**
         * @name            s-position--sticky
         * @namespace       sugar.css.mixins.position
         * @type            CssClass
         * 
         * This class allows you to apply the value "<yellow>sticky</yellow>" to the position property on any HTMLElement
         * 
         * @example     html
         * <div class="s-position--sticky">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-position--sticky{
            position: sticky !important;
        }
    }

  `);

    replaceWith(vars);
}
