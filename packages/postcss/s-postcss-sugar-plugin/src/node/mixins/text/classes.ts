import __SInterface from '@coffeekraken/s-interface';

import __faker from 'faker';

/**
 * @name           classes
 * @as              @s.text.classes
 * @namespace      node.mixin.text
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the text helper classes like s-text:center, s-text:left, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.text.classes
 *
 * @example        css
 * \@s.text.classes;
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
        * @namespace          sugar.style.helpers.text
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/text
        * @platform       css
        * @status       stable
        * 
        * These classes allows to apply some text styling like \`text-align: left\`, \`text-align: right\`, \`text-decoration: underline\`, etc...
        * directly inside your HTML.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.text.classes; 
        * 
        * @cssClass             s-text:left             Align the text to the left
        * @cssClass             s-text:right             Align the text to the right
        * @cssClass             s-text:center             Align the text to the center
        * @cssClass             s-text:start             Align the text to the start (rtl aware)
        * @cssClass             s-text:end             Align the text to the end (rtl aware)
        * @cssClass             s-text:justify             Align the text to the justify
        * @cssClass             s-text:decoration:none                  Apply the none text decoration
        * @cssClass             s-text:overline             Apply the overline text decoration
        * @cssClass             s-text:line-through             Apply the line-through text decoration
        * @cssClass             s-text:underline             Apply the underline text decoration
        * @cssClass             s-text:lowercase             Apply the lowercase text transform
        * @cssClass             s-text:uppercase             Apply the uppercase text transform
        * @cssClass             s-text:capitalize             Apply the capitalize text transform
        * 
        * @example        html          Aligns
        *   <div class="s-text:left s-bc:main s-p:20 s-mbe:30 s-radius">
        *       (left) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:right s-bc:main s-p:20 s-mbe:30 s-radius">
        *       (right) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:center s-bc:main s-p:20 s-mbe:30 s-radius">
        *       (center) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:start s-bc:main s-p:20 s-mbe:30 s-radius">
        *       (start) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:end s-bc:main s-p:20 s-mbe:30 s-radius">
        *       (end) ${__faker.name.findName()}
        *   </div>
        * 
        * @example        html          Decorations
        *   <div class="s-text:overline s-bc:main s-p:20 s-mbe:30 s-radius">
        *       (overline) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:underline s-bc:main s-p:20 s-mbe:30 s-radius">
        *       (underline) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:line-through s-bc:main s-p:20 s-mbe:30 s-radius">
        *       (line-through) ${__faker.name.findName()}
        *   </div>
        * 
        * @example        html          Transforms
        *   <div class="s-text:lowercase s-bc:main s-p:20 s-mbe:30 s-radius">
        *       (lowercase) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:uppercase s-bc:main s-p:20 s-mbe:30 s-radius">
        *       (uppercase) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:capitalize s-bc:main s-p:20 s-mbe:30 s-radius">
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
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-left {
            text-align: left;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
       /**
         * @name            s-text:right
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-right {
            text-align: right;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-text:center
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-center {
            text-align: center;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
           /**
         * @name            s-text:start
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-start {
            text-align: start;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
          /**
         * @name            s-text:end
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-end {
            text-align: end;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
         /**
         * @name            s-text:justify
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-justify {
            text-align: justify;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-text:decoration:none
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
         * 
         * This class allows you to remove any text decoration on the text
         * 
         * @example     html
         * <div class="s-text:none">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `,
    ).code(
        `
        .s-text-decoration.s-text-none {
            text-decoration: none !important;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-text:overline
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-overline {
            text-decoration: overline;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-text:underline
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-underline {
            text-decoration: underline;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-text:line-through
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-line-through {
            text-decoration: line-through;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-text:lowercase
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-lowercase {
            text-transform: lowercase;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-text:uppercase
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-uppercase {
            text-transform: uppercase;
        }
        `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-text:capitalize
         * @namespace          sugar.style.helpers.text
         * @type            CssClass
         * @platform      css
         * @status        stable
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
    ).code(
        `
        .s-text-capitalize {
            text-transform: capitalize;
        }
        `,
        { type: 'CssClass' },
    );

    return vars;
}
