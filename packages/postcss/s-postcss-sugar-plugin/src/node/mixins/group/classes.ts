import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixin.group
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the group helper classes like s-group, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.group.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginGroupClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginGroupClassesParams {}

export { postcssSugarPluginGroupClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginGroupClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginGroupClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Group
        * @namespace          sugar.style
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/group
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to group elements like s-btn, s-input, etc...
        * Note that for this to work fine when direction is "rtl", you MUST specify the dir="rtl" attribute
        * on the html tag
        * 
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for text formatting through the \`s-format:text\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @cssClass             s-group             Group some elements (button, inputs, etc...) together
        * 
        * @example       html       Button group
        * <span class="s-group">
        *   <a class="s-btn--block">I'm a cool block button</a>
        *   <a class="s-btn--block">+</a>
        * </span>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.comment(
        () => `/**
        * @name           s-group
        * @namespace          sugar.style.group
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">group</s-color>" of buttons, form input, etc...
        * 
        * @example        html
        * <span class="s-group">
        *   <a class="s-btn--block">I'm a cool block button</a>
        *   <a class="s-btn--block">+</a>
        * </span>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`,
    );
    vars.code(
        `
      .s-group {
          display: inline-flex !important;   
          flex-wrap: nowrap;
          vertical-align: top;
      }

     .s-group:not([dir="rtl"] .s-group):not(.s-group[dir="rtl"]) > * {

        &:not(:first-child):not(:last-child),
        &:not(:first-child):not(:last-child):before,
        &:not(:first-child):not(:last-child):after {
            border-radius: 0 !important;
        }
        &:first-child:not(:last-child),
        &:first-child:not(:last-child):before,
        &:first-child:not(:last-child):after {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
        &:last-child:not(:first-child),
        &:last-child:not(:first-child):before,
        &:last-child:not(:first-child):after {
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-right: none !important;
        }
      }

     *[dir="rtl"] .s-group > *,
     .s-group[dir="rtl"] > * {

        &:not(:last-child):not(:first-child),
        &:not(:last-child):not(:first-child):before,
        &:not(:last-child):not(:first-child):after {
            border-radius: 0 !important;
        }
        &:last-child:not(:first-child),
        &:last-child:not(:first-child):before,
        &:last-child:not(:first-child):after {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
        &:first-child:not(:last-child),
        &:first-child:not(:last-child):before,
        &:first-child:not(:last-child):after {
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-left: none !important;
        }
      }
    `,
        {
            type: 'CssClass',
        },
    );

    return vars;
}
