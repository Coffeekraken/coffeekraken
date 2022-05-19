import __SInterface from '@coffeekraken/s-interface';

import __unique from '@coffeekraken/sugar/shared/array/unique';
import __faker from 'faker';

/**
 * @name           classes
 * @namespace      node.mixin.text
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the text helper classes like s-text:center, s-text:left, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.text.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginTextClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginTextClassesParams {}

export { postcssSugarPluginTextClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginTextClassesParams>;
    atRule: any;
    CssVars;
    aby;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginTextClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Text
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/text
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some text styling like \`text-align: left\`, \`text-align: right\`, \`text-decoration: underline\`, etc...
        * directly inside your HTML.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass             s-text:left             Align the text to the left
        * @cssClass             s-text:right             Align the text to the right
        * @cssClass             s-text:center             Align the text to the center
        * @cssClass             s-text:start             Align the text to the start (rtl aware)
        * @cssClass             s-text:end             Align the text to the end (rtl aware)
        * @cssClass             s-text:justify             Align the text to the justify
        * @cssClass             s-text:overline             Apply the overline text decoration
        * @cssClass             s-text:line-through             Apply the line-through text decoration
        * @cssClass             s-text:underline             Apply the underline text decoration
        * @cssClass             s-text:lowercase             Apply the lowercase text transform
        * @cssClass             s-text:uppercase             Apply the uppercase text transform
        * @cssClass             s-text:capitalize             Apply the capitalize text transform
        * 
        * @example        html          Aligns
        *   <div class="s-text:left s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (left) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:right s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (right) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:center s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (center) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:start s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (start) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:end s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (end) ${__faker.name.findName()}
        *   </div>
        * 
        * @example        html          Decorations
        *   <div class="s-text:overline s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (overline) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:underline s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (underline) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:line-through s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (line-through) ${__faker.name.findName()}
        *   </div>
        * 
        * @example        html          Transforms
        *   <div class="s-text:lowercase s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (lowercase) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:uppercase s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (uppercase) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:capitalize s-bg:main s-p:20 s-mbe:30 s-radius">
        *       (capitalize) ${__faker.name.findName()}
        *   </div>
        * 
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    // align
    vars.comment(
        () => `
        /**
         * @name            s-text:left
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to align text to the left side
         * 
         * @example     html
         * <div class="s-text:left">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
    `,
    ).code(`
        .s-text--left {
            text-align: left;
        }
        `);

    vars.comment(
        () => `
       /**
         * @name            s-text:right
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to align text to the right side
         * 
         * @example     html
         * <div class="s-text:right">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(`
        .s-text--right {
            text-align: right;
        }
        `);

    vars.comment(
        () => `
        /**
         * @name            s-text:center
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to align text to the center
         * 
         * @example     html
         * <div class="s-text:center">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
         `,
    ).code(`
        .s-text--center {
            text-align: center;
        }
        `);

    vars.comment(
        () => `
           /**
         * @name            s-text:start
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to align text to the start (left) side, (right) when rtl
         * 
         * @example     html
         * <div class="s-text:start">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(`
        .s-text--start {
            text-align: start;
        }
        `);

    vars.comment(
        () => `
          /**
         * @name            s-text:end
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to align text to the end (right) side, (left) when rtl
         * 
         * @example     html
         * <div class="s-text:end">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(`
        .s-text--end {
            text-align: end;
        }
        `);

    vars.comment(
        () => `
         /**
         * @name            s-text:justify
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to justify the text
         * 
         * @example     html
         * <div class="s-text:justify">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(`
        .s-text--justify {
            text-align: justify;
        }
        `);

    vars.comment(
        () => `
        /**
         * @name            s-text:overline
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to overline the text
         * 
         * @example     html
         * <div class="s-text:overline">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(`
        .s-text--overline {
            text-decoration: overline;
        }
        `);

    vars.comment(
        () => `
        /**
         * @name            s-text:underline
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to underline the text
         * 
         * @example     html
         * <div class="s-text:underline">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(`
        .s-text--underline {
            text-decoration: underline;
        }
        `);

    vars.comment(
        () => `
        /**
         * @name            s-text:line-through
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to line-through the text
         * 
         * @example     html
         * <div class="s-text:line-through">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(`
        .s-text--line-through {
            text-decoration: line-through;
        }
        `);

    vars.comment(
        () => `
        /**
         * @name            s-text:lowercase
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to lowercase the text
         * 
         * @example     html
         * <div class="s-text:lowercase">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(`
        .s-text--lowercase {
            text-transform: lowercase;
        }
        `);

    vars.comment(
        () => `
        /**
         * @name            s-text:uppercase
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to uppercase the text
         * 
         * @example     html
         * <div class="s-text:uppercase">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(`
        .s-text--uppercase {
            text-transform: uppercase;
        }
        `);

    vars.comment(
        () => `
        /**
         * @name            s-text:capitalize
         * @namespace          sugar.style.mixins.text
         * @type            CssClass
         * @platform      css
         * @status        beta
         * 
         * This class allows you to capitalize the text
         * 
         * @example     html
         * <div class="s-text:capitalize">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(`
        .s-text--capitalize {
            text-transform: capitalize;
        }
        `);

    return vars;
}
