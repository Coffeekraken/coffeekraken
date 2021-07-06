import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';

class postcssSugarPluginAlignClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginAlignClassesParams {}

export { postcssSugarPluginAlignClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginAlignClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginAlignClassesParams = {
    ...params
  };

  const vars: string[] = [];

  vars.push(`
        
    /**
     * @name            s-align--abs-top
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the top
     * 
     * @example     html
     * <div class="s-ratio--1-1">
     *      <div class="s-align--abs-top">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-top {
        @sugar.align.abs(top);
    }

    /**
     * @name            s-align--abs-left
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the left
     * 
     * @example     html
     * <div class="s-ratio--1-1">
     *      <div class="s-align--abs-left">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-left {
        @sugar.align.abs(left);
    }

    /**
     * @name            s-align--abs-right
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the right
     * 
     * @example     html
     * <div class="s-ratio--1-1">
     *      <div class="s-align--abs-right">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-right {
        @sugar.align.abs(right);
    }

    /**
     * @name            s-align--abs-bottom
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the bottom
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align--abs-bottom">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-bottom {
        @sugar.align.abs(bottom);
    }

    /**
     * @name            s-align--abs-center
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the center
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align--abs-center">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-center {
        @sugar.align.abs(center);
    }

    /**
     * @name            s-align--abs-top-left
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the top-left
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align--abs-top-left">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-top-left {
        @sugar.align.abs(top left);
    }

    /**
     * @name            s-align--abs-top-center
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the top-center
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align--abs-top-center">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-top-center {
        @sugar.align.abs(top center-x);
    }

    /**
     * @name            s-align--abs-top-right
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the top-right
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align--abs-top-right">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-top-right {
        @sugar.align.abs(top right);
    }

    /**
     * @name            s-align--abs-center-left
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the center-y and left
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align--abs-center-left">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-center-left {
        @sugar.align.abs(left center-y);
    }

    /**
     * @name            s-align--abs-center-right
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the center-y and right
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align--abs-center-right">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-center-right {
        @sugar.align.abs(right center-y);
    }

    /**
     * @name            s-align--abs-bottom-left
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the bottom left
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align--abs-bottom-left">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-bottom-left {
        @sugar.align.abs(bottom left);
    }

    /**
     * @name            s-align--abs-bottom-center
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the bottom center-x
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align--abs-bottom-center">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-bottom-center {
        @sugar.align.abs(bottom center-x);
    }

    /**
     * @name            s-align--abs-bottom-right
     * @namespace       sugar.css.mixins.align
     * @type            CssClass
     * 
     * This class allows you to align an element using the absolute method
     * to the bottom right
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align--abs-bottom-right">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-bottom-right {
        @sugar.align.abs(bottom right);
    }

  `);

    replaceWith(vars);
}
