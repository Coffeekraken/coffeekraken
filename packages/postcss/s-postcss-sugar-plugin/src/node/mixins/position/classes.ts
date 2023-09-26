import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @as            @s.position.classes
 * @namespace      node.mixin.position
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the position helper classes like s-position:absolute, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet     @s.position.classes
 *
 * @example        css
 * \@s.position.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginPositionClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginPositionClassesParams {}

export { postcssSugarPluginPositionClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginPositionClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginPositionClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Positions
        * @namespace          sugar.style.helpers.position
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/positions
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some positions like \`absolute\`, \`fixed\`, etc... on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.position.classes;
        * 
        * @cssClass       s-position:absolute       Apply the \`absolute\` position
        * @cssClass       s-position:relative       Apply the \`relative\` position
        * @cssClass       s-position:fixed       Apply the \`fixed\` position
        * @cssClass       s-position:sticky       Apply the \`sticky\` position
        * @cssClass       s-position:top        Apply the \`top\` position to \`0\`
        * @cssClass       s-position:left        Apply the \`left\` position to \`0\`
        * @cssClass       s-position:right        Apply the \`right\` position to \`0\`
        * @cssClass       s-position:bottom        Apply the \`bottom\` position to \`0\`
        * @cssClass       s-position:center        Center the element either horizontally, vertically or both if no other alignement are specified
        * 
        * @example        html    Absolute
        *   <div class="s-position:relative s-ratio:16-9">
        *       <img class="s-position:absolute:top:left s-radius" src="https://picsum.photos/100/100?v=323333"/>
        *       <img class="s-position:absolute:top:center s-radius" src="https://picsum.photos/100/100?v=3232"/>
        *       <img class="s-position:absolute:top:right s-radius" src="https://picsum.photos/100/100?v=3222132"/>
        *       <img class="s-position:absolute:center:left s-radius" src="https://picsum.photos/100/100?v=322232"/>
        *       <img class="s-position:absolute:center s-radius" src="https://picsum.photos/100/100?v=3434"/>
        *       <img class="s-position:absolute:center:right s-radius" src="https://picsum.photos/100/100?v=35456232"/>
        *       <img class="s-position:absolute:bottom:left s-radius" src="https://picsum.photos/100/100?v=6566"/>
        *       <img class="s-position:absolute:bottom:center s-radius" src="https://picsum.photos/100/100?v=8787"/>
        *       <img class="s-position:absolute:bottom:right s-radius" src="https://picsum.photos/100/100?v=2323"/>
        *   </div>
        * 
        * @example        html        Relative
        *   <div class="s-position:relative s-ratio:21-9">
        *       <img class="s-position:relative" src="https://picsum.photos/100/100"/>
        *   </div>
        * 
        * @example        html        Fixed
        *   <div class="s-position:relative s-ratio:21-9">
        *       <img class="s-position:fixed:top:left s-radius" src="https://picsum.photos/100/100?v=323333"/>
        *       <img class="s-position:fixed:top:center s-radius" src="https://picsum.photos/100/100?v=3232"/>
        *       <img class="s-position:fixed:top:right s-radius" src="https://picsum.photos/100/100?v=3222132"/>
        *       <img class="s-position:fixed:center:left s-radius" src="https://picsum.photos/100/100?v=322232"/>
        *       <img class="s-position:fixed:center s-radius" src="https://picsum.photos/100/100?v=3434"/>
        *       <img class="s-position:fixed:center:right s-radius" src="https://picsum.photos/100/100?v=35456232"/>
        *       <img class="s-position:fixed:bottom:left s-radius" src="https://picsum.photos/100/100?v=6566"/>
        *       <img class="s-position:fixed:bottom:center s-radius" src="https://picsum.photos/100/100?v=8787"/>
        *       <img class="s-position:fixed:bottom:right s-radius" src="https://picsum.photos/100/100?v=2323"/>
        *   </div>
        * 
        * @example    html    Sticky
        *   <div class="s-position:relative s-ratio:21-9">
        *       <div class="s-position:sticky:top">
        *         <img class="s-mbs:100 s-radius" src="https://picsum.photos/100/100?v=323333"/>
        *     </div>
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.comment(
        () => `
        
      /**
       * @name            s-position:absolute
       * @namespace          sugar.style.helpers.position
       * @type            CssClass
       * @platform      css
       * @status        stable
       * 
       * This class allows you to apply the value "<yellow>absolute</yellow>" to the position property on any HTMLElement
       * 
       * @example     html
       * <div class="s-position:absolute">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
    `,
    ).code(
        `
      .s-position-absolute{
          position: absolute !important;
      }
      `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `

          /**
           * @name            s-position:relative
           * @namespace          sugar.style.helpers.position
           * @type            CssClass
           * @platform        css
           * @status          stable
           * 
           * This class allows you to apply the value "<yellow>relative</yellow>" to the position property on any HTMLElement
           * 
           * @example     html
           * <div class="s-position:relative">
           *  Hello world
           * </div>
           * 
           * @since       2.0.0
           * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
        `,
    ).code(
        `
      .s-position-relative{
          position: relative !important;
      }
      `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
          /**
           * @name            s-position:fixed
           * @namespace          sugar.style.helpers.position
           * @type            CssClass
           * @platform        css
           * @status          stable
           * 
           * This class allows you to apply the value "<yellow>fixed</yellow>" to the position property on any HTMLElement
           * 
           * @example     html
           * <div class="s-position:fixed">
           *  Hello world
           * </div>
           * 
           * @since       2.0.0
           * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
        `,
    ).code(
        `
      .s-position-fixed{
          position: fixed !important;
      }
      `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-position::sticky
         * @namespace          sugar.style.mixins.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the value "<yellow>sticky</yellow>" to the position property on any HTMLElement
         * 
         * @example     html
         * <div class="s-position:sticky">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `,
    ).code(
        `
      .s-position-sticky{
          position: sticky !important;
      }
      `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-position:top
         * @namespace          sugar.style.helpers.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the top property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:top">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `,
    ).code(
        `
      .s-position-top {
        top: 0;
      }
      `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-position:left
         * @namespace          sugar.style.helpers.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the left property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:left">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `,
    ).code(
        `
      .s-position-left {
        left: 0;
      }
      `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
        /**
         * @name            s-position:bottom
         * @namespace          sugar.style.helpers.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the bottom property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:bottom">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `,
    ).code(
        `
      .s-position-bottom {
        bottom: 0;
      }
      `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
      /**
         * @name            s-position:right
         * @namespace          sugar.style.helpers.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the right property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:right">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `,
    ).code(
        `
      .s-position-right {
        right: 0;
      }
      `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `
      /**
         * @name            s-position:center
         * @namespace          sugar.style.helpers.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the right property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:right">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `,
    ).code(
        `
      .s-position-center:not(.s-position-top):not(.s-position-bottom):not(.s-position-left):not(.s-position-right) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .s-position-center.s-position-left,
      .s-position-center.s-position-right {
        top: 50%;
        transform: translateY(-50%);
      }
      .s-position-center.s-position-top,
      .s-position-center.s-position-bottom {
        left: 50%;
        transform: translateX(-50%);
      }
      `,
        { type: 'CssClass' },
    );

    return vars;
}
