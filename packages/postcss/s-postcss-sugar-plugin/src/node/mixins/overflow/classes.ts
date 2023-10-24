import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @as              @s.overflow.classes
 * @namespace      node.mixin.overflow
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the overflow helper classes like ```.s-overflow:hidden```, ```.s-overflow:auto```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.overflow.classes
 *
 * @example        css
 * @s.overflow.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginOverflowClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginOverflowClassesParams {}

export { postcssSugarPluginOverflowClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginOverflowClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginOverflowClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Overflow
        * @namespace          sugar.style.helpers.overflow
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/overflow
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some overflow attributes on any HTMLElement.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.overflow.classes;
        * 
        * @cssClass         s-overflow:auto             Apply the "auto" overflow attribute
        * @cssClass         s-overflow:hidden             Apply the "hidden" overflow attribute
        * @cssClass         s-overflow:inherit             Apply the "inherit" overflow attribute
        * @cssClass         s-overflow:initial             Apply the "initial" overflow attribute
        * @cssClass         s-overflow:overlay             Apply the "overlay" overflow attribute
        * @cssClass         s-overflow:revert             Apply the "revert" overflow attribute
        * @cssClass         s-overflow:scroll             Apply the "scroll" overflow attribute
        * @cssClass         s-overflow:visible             Apply the "visible" overflow attribute
        * @cssClass         s-overflow:unset             Apply the "unset" overflow attribute
        * 
        * @example        html          Auto
        * <div class="s-overflow:auto">
        *   I'm in an "auto" overflow container
        * </div>
        * 
        * @example        html          Hidden
       * <div class="s-overflow:hidden">
       *   I'm in an "hidden" overflow container
       * </div>
       * 
       * @example        html          Inherit
       * <div class="s-overflow:inherit">
       *   I'm in an "inherit" overflow container
       * </div>
       * 
       * @example        html          Initial
       * <div class="s-overflow:initial">
       *   I'm in an "initial" overflow container
       * </div>
       * 
       * @example        html          Overlay
       * <div class="s-overflow:overlay">
       *   I'm in an "overlay" overflow container
       * </div>
       * 
       * @example        html          Revert
       * <div class="s-overflow:revert">
       *   I'm in an "revert" overflow container
       * </div>
       * 
       * @example        html          Scroll
       * <div class="s-overflow:scroll">
       *   I'm in an "scroll" overflow container
       * </div>
       * 
       * @example        html          Visible
       * <div class="s-overflow:visible">
       *   I'm in an "visible" overflow container
       * </div>
       * 
       * @example        html          Unset
       * <div class="s-overflow:unset">
       *   I'm in an "unset" overflow container
       * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.comment(
        () => `/**
    * @name          s-overflow:auto
    * @namespace          sugar.style.helpers.overflow
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>auto</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bc:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
    `,
    ).code(
        `
    .s-overflow-auto {
        overflow: auto;
    }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
    * @name          s-overflow:hidden
    * @namespace          sugar.style.helpers.overflow
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bc:accent">
    *     <div class="s-center-abs">I'm a cool overflow hidden container</div>
    * </div>
    */
    `,
    ).code(
        `
    .s-overflow-hidden {
        overflow: hidden;
    }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
    * @name          s-overflow:inherit
    * @namespace          sugar.style.helpers.overflow
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>inherit</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bc:accent">
    *     <div class="s-center-abs">I'm a cool overflow inherit container</div>
    * </div>
    */
    `,
    ).code(
        `
    .s-overflow-inherit {
        overflow: inherit;
    }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
    * @name          s-overflow:initial
    * @namespace          sugar.style.helpers.overflow
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>initial</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bc:accent">
    *     <div class="s-center-abs">I'm a cool overflow initial container</div>
    * </div>
    */
    `,
    ).code(
        `
    .s-overflow-initial {
        overflow: initial;
    }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
    * @name          s-overflow:overlay
    * @namespace          sugar.style.helpers.overflow
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>overlay</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bc:accent">
    *     <div class="s-center-abs">I'm a cool overflow overlay container</div>
    * </div>
    */
    `,
    ).code(
        `
    .s-overflow-overlay {
        overflow: overlay;
    }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
    * @name          s-overflow:revert
    * @namespace          sugar.style.helpers.overflow
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>revert</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bc:accent">
    *     <div class="s-center-abs">I'm a cool overflow revert container</div>
    * </div>
    */
    `,
    ).code(
        `
    .s-overflow-revert {
        overflow: revert;
    }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
    * @name          s-overflow:scroll
    * @namespace          sugar.style.helpers.overflow
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>scroll</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bc:accent">
    *     <div class="s-center-abs">I'm a cool overflow scroll container</div>
    * </div>
    */
    `,
    ).code(
        `
    .s-overflow-scroll {
        overflow: scroll;
    }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
    * @name          s-overflow:visible
    * @namespace          sugar.style.helpers.overflow
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>visible</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bc:accent">
    *     <div class="s-center-abs">I'm a cool overflow visible container</div>
    * </div>
    */
    `,
    ).code(
        `
    .s-overflow-visible {
        overflow: visible;
    }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
    * @name          s-overflow:unset
    * @namespace          sugar.style.helpers.overflow
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>unset</yellow>" overflow style to any HTMLElement
    * 
    * @example        html
    * <div class="s-overflow:hidden s-bc:accent">
    *     <div class="s-center-abs">I'm a cool overflow unset container</div>
    * </div>
    */
    `,
    ).code(
        `
    .s-overflow-unset {
        overflow: unset;
    }`,
        { type: 'CssClass' },
    );

    return vars;
}
