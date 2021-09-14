import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';

/**
 * @name           classes
 * @namespace      node.mixins.text
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the text helper classes like s-text:center, s-text:left, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.text.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginTextClassesInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginTextClassesParams {}

export { postcssSugarPluginTextClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginTextClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginTextClassesParams = {
        ...params,
    };

    const vars: string[] = [];

    // align
    vars.push(`
        /**
         * @name            s-text:left
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to align text to the left side
         * 
         * @example     html
         * <div class="s-text\:left">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-text--left {
            text-align: left;
        }

       /**
         * @name            s-text:right
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to align text to the right side
         * 
         * @example     html
         * <div class="s-text\:right">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-text--right {
            text-align: right;
        }

        /**
         * @name            s-text:center
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to align text to the center
         * 
         * @example     html
         * <div class="s-text\:center">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-text--center {
            text-align: center;
        }

           /**
         * @name            s-text:start
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to align text to the start (left) side, (right) when rtl
         * 
         * @example     html
         * <div class="s-text\:start">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-text--start {
            text-align: start;
        }

          /**
         * @name            s-text:end
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to align text to the end (right) side, (left) when rtl
         * 
         * @example     html
         * <div class="s-text\:end">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-text--end {
            text-align: end;
        }

         /**
         * @name            s-text:justify
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to justify the text
         * 
         * @example     html
         * <div class="s-text\:justify">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-text--justify {
            text-align: justify;
        }

  `);

    replaceWith(vars);
}
