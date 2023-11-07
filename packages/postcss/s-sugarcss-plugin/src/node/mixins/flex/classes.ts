import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';

/**
 * @name           classes
 * @as              @s.flex.classes
 * @namespace      node.mixin.flex
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the flex helper classes like s-flex, s-flex:align-top, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.flex.classes
 *
 * @example        css
 * @s.flex.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginFlexClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginFlexClassesParams {}

export { SSugarcssPluginFlexClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginFlexClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginFlexClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Flex
        * @namespace          sugar.style.helpers.flex
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/flexbox
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some flex attributes on any HTMLElement and with
        * that you can **create some layouts directly in your HTML**.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.flex.classes;
        * 
        * @cssClass                 s-flex              Apply a display "flex" on any HTMLElement
        * @cssClass                 s-flex:row          Apply the flex direction to "row"
        * @cssClass                 s-flex:row-reverse          Apply the flex direction to "row-reverse"
        * @cssClass                 s-flex:column          Apply the flex direction to "column"
        * @cssClass                 s-flex:column-reverse          Apply the flex direction to "column-reverse"
        * @cssClass                 s-flex:nowrap             Apply the wrap property to "nowrap"
        * @cssClass                 s-flex:wrap             Apply the wrap property to "wrap"
        * @cssClass                 s-flex:wrap-reverse             Apply the wrap property to "wrap-reverse"
        * @cssClass                 s-flex:center                   Apply the align-items AND the justify-content property to "center"
        * @cssClass                 s-flex-start                  Apply the align-items AND the justify-content property to "start"
        * @cssClass                 s-flex-end                  Apply the align-items AND the justify-content property to "end"
        * @cssClass                 s-flex:justify-start             Apply the justify-content property to "start"
        * @cssClass                 s-flex:justify-flex-start             Apply the justify-content property to "flex-start"
        * @cssClass                 s-flex:justify-end             Apply the justify-content property to "end"
        * @cssClass                 s-flex:justify-flex-end             Apply the justify-content property to "flex-end"
        * @cssClass                 s-flex:justify-center             Apply the justify-content property to "center"  
        * @cssClass                 s-flex:justify-space-between             Apply the justify-content property to "space-between"
        * @cssClass                 s-flex:justify-space-around             Apply the justify-content property to "space-around"
        * @cssClass                 s-flex:justify-space-evenly             Apply the justify-content property to "space-evenly"
        * @cssClass                 s-flex:justify-stretch             Apply the justify-content property to "stretch"
        * @cssClass                 s-flex:align-start             Apply the align-items property to "start"
        * @cssClass                 s-flex:align-flex-start             Apply the align-items property to "flex-start"
        * @cssClass                 s-flex:align-end             Apply the align-items property to "end"
        * @cssClass                 s-flex:align-flex-end             Apply the align-items property to "flex-end"
        * @cssClass                 s-flex:align-center             Apply the align-items property to "center"
        * @cssClass                 s-flex:align-baseline             Apply the align-items property to "baseline"
        * 
        * @example        html          Simple grid
        *   <div class="s-flex:row:wrap">
        *     <div class="s-bc:main s-width:50 s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bc:accent s-width:50 s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bc:complementary s-width:50 s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bc:info s-width:50 s-p:30">${__faker.name.findName()}</div>
        *   </div>
        * 
        * @example        html          Grow
        *   <div class="s-flex:row">
        *     <div class="s-grow s-bc:main s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bc:accent s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bc:complementary s-p:30">${__faker.name.findName()}</div>
        *   </div>
        * 
        * @example      html          Orders
        *   <div class="s-flex:row">
        *     <div class="s-order:3 s-bc:main s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bc:accent s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bc:complementary s-p:30">${__faker.name.findName()}</div>
        *   </div>
        * 
        * @example          html            Aligns
        *   <div class="s-flex:row:align-end">
        *     <div class="s-bc:main s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bc:accent s-p:30">${__faker.name.findName()}<br />${__faker.name.findName()}<br />${__faker.name.findName()}<br />${__faker.name.findName()}<br />${__faker.name.findName()}</div>
        *     <div class="s-bc:complementary s-p:30">${__faker.name.findName()}</div>
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.comment(
        () => `/**
            * @name          s-flex
            * @namespace          sugar.style.helper.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows you to apply the flex styling to any HTMLElement
            * 
            * @example        html
            * <div class="s-flex"></div>
            */
        `,
    ).code(
        `
            .s-flex {
                display: flex;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:row
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the flex-direction to row
            * 
            * @example        html
            * <div class="s-flex\:row"></div>
            */
        `,
    ).code(
        `
            .s-flex-row {
                flex-direction: row;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:row-reverse
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the flex-direction to row-reverse
            * 
            * @example        html
            * <div class="s-flex\:row-reverse"></div>
            */
        `,
    ).code(
        `
            .s-flex-row-reverse {
                flex-direction: row-reverse;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:column
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the flex-direction to column
            * 
            * @example        html
            * <div class="s-flex\:column"></div>
            */
        `,
    ).code(
        `
            .s-flex-column {
                flex-direction: column;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:column-reverse
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the flex-direction to column-reverse
            * 
            * @example        html
            * <div class="s-flex\:column-reverse"></div>
            */
           `,
    ).code(
        `
            .s-flex-column-reverse {
                flex-direction: column-reverse;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:nowrap
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the flex-wrap to nowrap
            * 
            * @example        html
            * <div class="s-flex\:nowrap"></div>
            */
           `,
    ).code(
        `
            .s-flex-nowrap {
                flex-wrap: nowrap;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:wrap
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the flex-wrap to wrap
            * 
            * @example        html
            * <div class="s-flex\:wrap"></div>
            */
           `,
    ).code(
        `
            .s-flex-wrap {
                flex-wrap: wrap;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:wrap-reverse
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the flex-wrap to wrap-reverse
            * 
            * @example        html
            * <div class="s-flex\:wrap-reverse"></div>
            */
           `,
    ).code(
        `
            .s-flex-wrap-reverse {
                flex-wrap: wrap-reverse;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:start
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the align-items AND justify-content property to start
            * 
            * @example        html
            * <div class="s-flex\:start"></div>
            */
           `,
    ).code(
        `
            .s-flex-start {
                align-items: start;
                justify-content: start;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:center
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the align-items AND justify-content property to center
            * 
            * @example        html
            * <div class="s-flex\:center"></div>
            */
           `,
    ).code(
        `
            .s-flex-center {
                align-items: center;
                justify-content: center;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:end
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the align-items AND justify-content property to end
            * 
            * @example        html
            * <div class="s-flex\:end"></div>
            */
           `,
    ).code(
        `
            .s-flex-end {
                align-items: end;
                justify-content: end;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:justify-start
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the justify-content property to start
            * 
            * @example        html
            * <div class="s-flex\:justify-start"></div>
            */
           `,
    ).code(
        `
            .s-flex-justify-start {
                justify-content: start;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:justify-flex-start
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the justify-content property to flex-start
            * 
            * @example        html
            * <div class="s-flex\:justify-flex-start"></div>
            */
           `,
    ).code(
        `
            .s-flex-justify-flex-start {
                justify-content: flex-start;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:justify-end
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the justify-content property to end
            * 
            * @example        html
            * <div class="s-flex\:justify-end"></div>
            */
           `,
    ).code(
        `
            .s-flex-justify-end {
                justify-content: end;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:justify-flex-end
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the justify-content property to flex-end
            * 
            * @example        html
            * <div class="s-flex\:justify-flex-end"></div>
            */
           `,
    ).code(
        `
            .s-flex-justify-flex-end {
                justify-content: flex-end;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:justify-center
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the justify-content property to flex-center
            * 
            * @example        html
            * <div class="s-flex\:justify-center"></div>
            */
           `,
    ).code(
        `
            .s-flex-justify-center {
                justify-content: center;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:justify-space-between
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the justify-content property to space-between
            * 
            * @example        html
            * <div class="s-flex\:justify-space-between"></div>
            */
           `,
    ).code(
        `
            .s-flex-justify-space-between {
                justify-content: space-between;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:justify-space-around
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the justify-content property to space-around
            * 
            * @example        html
            * <div class="s-flex\:justify-space-around"></div>
            */
           `,
    ).code(
        `
            .s-flex-justify-space-around {
                justify-content: space-around;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:justify-space-evenly
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the justify-content property to space-evenly
            * 
            * @example        html
            * <div class="s-flex\:justify-space-evenly"></div>
            */
           `,
    ).code(
        `
            .s-flex-justify-space-evenly {
                justify-content: space-evenly;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:justify-stretch
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the justify-content property to stretch
            * 
            * @example        html
            * <div class="s-flex\:justify-stretch"></div>
            */
           `,
    ).code(
        `
            .s-flex-justify-stretch {
                justify-content: stretch;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:align-start
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the align-items property to start
            * 
            * @example        html
            * <div class="s-flex\:align-start"></div>
            */
           `,
    ).code(
        `
            .s-flex-align-start {
                align-items: start;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:align-flex-start
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the align-items property to flex-start
            * 
            * @example        html
            * <div class="s-flex\:align-flex-start"></div>
            */
           `,
    ).code(
        `
            .s-flex-align-flex-start {
                align-items: flex-start;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:align-end
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the align-items property to end
            * 
            * @example        html
            * <div class="s-flex\:align-end"></div>
            */
           `,
    ).code(
        `
            .s-flex-align-end {
                align-items: end;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:align-flex-end
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the align-items property to flex-end
            * 
            * @example        html
            * <div class="s-flex\:align-flex-end"></div>
            */
           `,
    ).code(
        `
            .s-flex-align-flex-end {
                align-items: flex-end;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:align-center
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the align-items property to center
            * 
            * @example        html
            * <div class="s-flex\:align-center"></div>
            */
           `,
    ).code(
        `
            .s-flex-align-center {
                align-items: center;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
            * @name          s-flex:align-baseline
            * @namespace          sugar.style.helpers.flex
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows specify the align-items property to baseline
            * 
            * @example        html
            * <div class="s-flex\:align-baseline"></div>
            */
           `,
    ).code(
        `
            .s-flex-align-baseline {
                align-items: baseline;
            }`,
        { type: 'CssClass' },
    );

    return vars;
}
