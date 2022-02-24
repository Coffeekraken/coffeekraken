import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.flex
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the flex helper classes like s-flex, s-flex:align-top, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.flex.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFlexClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginFlexClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Flexbox
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/flexbox
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some flex attributes on any HTMLElement and with
        * that you can **create some layouts directly in your HTML**.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass                 s-flex              Apply a display "flex" on any HTMLElement
        * @cssClass                 s-flex:row          Apply the flex direction to "row"
        * @cssClass                 s-flex:row-reverse          Apply the flex direction to "row-reverse"
        * @cssClass                 s-flex:column          Apply the flex direction to "column"
        * @cssClass                 s-flex:column-reverse          Apply the flex direction to "column-reverse"
        * @cssClass                 s-flex:nowrap             Apply the wrap property to "nowrap"
        * @cssClass                 s-flex:wrap             Apply the wrap property to "wrap"
        * @cssClass                 s-flex:wrap-reverse             Apply the wrap property to "wrap-reverse"
        * @cssClass                 s-flex:justify-start             Apply the justify property to "start"
        * @cssClass                 s-flex:justify-flex-start             Apply the justify property to "flex-start"
        * @cssClass                 s-flex:justify-end             Apply the justify property to "end"
        * @cssClass                 s-flex:justify-flex-end             Apply the justify property to "flex-end"
        * @cssClass                 s-flex:justify-center             Apply the justify property to "center"  
        * @cssClass                 s-flex:justify-space-between             Apply the justify property to "space-between"
        * @cssClass                 s-flex:justify-space-around             Apply the justify property to "space-around"
        * @cssClass                 s-flex:justify-space-evenly             Apply the justify property to "space-evenly"
        * @cssClass                 s-flex:justify-stretch             Apply the justify property to "stretch"
        * @cssClass                 s-flex:align-start             Apply the align property to "start"
        * @cssClass                 s-flex:align-flex-start             Apply the align property to "flex-start"
        * @cssClass                 s-flex:align-end             Apply the align property to "end"
        * @cssClass                 s-flex:align-flex-end             Apply the align property to "flex-end"
        * @cssClass                 s-flex:align-center             Apply the align property to "center"
        * @cssClass                 s-flex:align-baseline             Apply the align property to "baseline"
        * @cssClass                 s-flex-item:grow             Apply the flex-grow property to "1"
        * @cssClass                 s-flex-item:shrink             Apply the flex-shrink property to "1"
        * @cssClass                 s-flex-item:align-flex-start        Align item to the start
        * @cssClass                 s-flex-item:align-flex-end        Align item to the end
        * @cssClass                 s-flex-item:align-center        Align item to the center
        * @cssClass                 s-flex-item:align-baseline        Align item to the baseline
        * @cssClass                 s-flex-item:align-stretch        Align item to the stretch
        * @cssClass                 s-flex-item:order-{0...20}             Apply the order {0...20} to any flex item
        * @cssClass                 s-flex-item:grow-{0...20}             Apply the grow {0...20} to any flex item
        * @cssClass                 s-flex-item:shrink-{0...20}             Apply the shrink {0...20} to any flex item
        * 
        * @example        html          Simple grid
        *   <div class="s-flex:row:wrap s-radius">
        *     <div class="s-bg:main s-width:50 s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bg:accent s-width:50 s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bg:complementary s-width:50 s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bg:info s-width:50 s-p:30">${__faker.name.findName()}</div>
        *   </div>
        * 
        * @example        html          Grow
        *   <div class="s-flex:row:nowrap s-radius">
        *     <div class="s-flex-item:grow s-bg:main s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bg:accent s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bg:complementary s-p:30">${__faker.name.findName()}</div>
        *   </div>
        * 
        * @example      html          Orders
        *   <div class="s-flex:row:nowrap s-radius">
        *     <div class="s-flex-item:order-3 s-bg:main s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bg:accent s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bg:complementary s-p:30">${__faker.name.findName()}</div>
        *   </div>
        * 
        * @example          html            Aligns
        *   <div class="s-flex:row:nowrap:align-end s-radius">
        *     <div class="s-bg:main s-p:30">${__faker.name.findName()}</div>
        *     <div class="s-bg:accent s-p:30">${__faker.name.findName()}<br />${__faker.name.findName()}<br />${__faker.name.findName()}<br />${__faker.name.findName()}<br />${__faker.name.findName()}</div>
        *     <div class="s-bg:complementary s-p:30">${__faker.name.findName()}</div>
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
            * @name          s-flex
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows you to apply the flex styling to any HTMLElement
            * 
            * @example        html
            * <div class="s-flex"></div>
            */
        `).code(`
            .s-flex {
                display: flex;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:row
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the flex-direction to row
            * 
            * @example        html
            * <div class="s-flex\:row"></div>
            */
        `).code(`
            .s-flex--row {
                flex-direction: row;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:row-reverse
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the flex-direction to row-reverse
            * 
            * @example        html
            * <div class="s-flex\:row-reverse"></div>
            */
        `).code(`
            .s-flex--row-reverse {
                flex-direction: row-reverse;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:column
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the flex-direction to column
            * 
            * @example        html
            * <div class="s-flex\:column"></div>
            */
        `).code(`
            .s-flex--column {
                flex-direction: column;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:column-reverse
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the flex-direction to column-reverse
            * 
            * @example        html
            * <div class="s-flex\:column-reverse"></div>
            */
           `).code(`
            .s-flex--column-reverse {
                flex-direction: column-reverse;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:nowrap
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the flex-wrap to nowrap
            * 
            * @example        html
            * <div class="s-flex\:nowrap"></div>
            */
           `).code(`
            .s-flex--nowrap {
                flex-wrap: nowrap;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:wrap
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the flex-wrap to wrap
            * 
            * @example        html
            * <div class="s-flex\:wrap"></div>
            */
           `).code(`
            .s-flex--wrap {
                flex-wrap: wrap;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:wrap-reverse
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the flex-wrap to wrap-reverse
            * 
            * @example        html
            * <div class="s-flex\:wrap-reverse"></div>
            */
           `).code(`
            .s-flex--wrap-reverse {
                flex-wrap: wrap-reverse;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:justify-start
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the justify-content property to start
            * 
            * @example        html
            * <div class="s-flex\:justify-start"></div>
            */
           `).code(`
            .s-flex--justify-start {
                justify-content: start;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:justify-flex-start
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the justify-content property to flex-start
            * 
            * @example        html
            * <div class="s-flex\:justify-flex-start"></div>
            */
           `).code(`
            .s-flex--justify-flex-start {
                justify-content: flex-start;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:justify-end
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the justify-content property to end
            * 
            * @example        html
            * <div class="s-flex\:justify-end"></div>
            */
           `).code(`
            .s-flex--justify-end {
                justify-content: end;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:justify-flex-end
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the justify-content property to flex-end
            * 
            * @example        html
            * <div class="s-flex\:justify-flex-end"></div>
            */
           `).code(`
            .s-flex--justify-flex-end {
                justify-content: flex-end;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:justify-center
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the justify-content property to flex-center
            * 
            * @example        html
            * <div class="s-flex\:justify-center"></div>
            */
           `).code(`
            .s-flex--justify-center {
                justify-content: center;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:justify-space-between
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the justify-content property to space-between
            * 
            * @example        html
            * <div class="s-flex\:justify-space-between"></div>
            */
           `).code(`
            .s-flex--justify-space-between {
                justify-content: space-between;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:justify-space-around
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the justify-content property to space-around
            * 
            * @example        html
            * <div class="s-flex\:justify-space-around"></div>
            */
           `).code(`
            .s-flex--justify-space-around {
                justify-content: space-around;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:justify-space-evenly
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the justify-content property to space-evenly
            * 
            * @example        html
            * <div class="s-flex\:justify-space-evenly"></div>
            */
           `).code(`
            .s-flex--justify-space-evenly {
                justify-content: space-evenly;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:justify-stretch
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the justify-content property to stretch
            * 
            * @example        html
            * <div class="s-flex\:justify-stretch"></div>
            */
           `).code(`
            .s-flex--justify-stretch {
                justify-content: stretch;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:align-start
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-items property to start
            * 
            * @example        html
            * <div class="s-flex\:align-start"></div>
            */
           `).code(`
            .s-flex--align-start {
                align-items: start;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:align-flex-start
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-items property to flex-start
            * 
            * @example        html
            * <div class="s-flex\:align-flex-start"></div>
            */
           `).code(`
            .s-flex--align-flex-start {
                align-items: flex-start;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:align-end
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-items property to end
            * 
            * @example        html
            * <div class="s-flex\:align-end"></div>
            */
           `).code(`
            .s-flex--align-end {
                align-items: end;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:align-flex-end
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-items property to flex-end
            * 
            * @example        html
            * <div class="s-flex\:align-flex-end"></div>
            */
           `).code(`
            .s-flex--align-flex-end {
                align-items: flex-end;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:align-center
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-items property to center
            * 
            * @example        html
            * <div class="s-flex\:align-center"></div>
            */
           `).code(`
            .s-flex--align-center {
                align-items: center;
            }`);
    vars.comment(() => `/**
            * @name          s-flex:align-baseline
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-items property to baseline
            * 
            * @example        html
            * <div class="s-flex\:align-baseline"></div>
            */
           `).code(`
            .s-flex--align-baseline {
                align-items: baseline;
            }`);
    vars.comment(() => `/**
        * @name          s-flex-item:grow
        * @namespace          sugar.css.flex
        * @type               CssClass
        * @platform           css
        * @status               beta
        * 
        * This class allows specify the flex-grow property of a flex item to 1
        * 
        * @example        html
        * <div class="s-flex">
        *   <div class="s-flex-item\:grow"></div>
        * </div>
        */
       `).code(`
        .s-flex-item--grow {
            flex-grow: 1;
        }`);
    vars.comment(() => `/**
        * @name          s-flex-item:shrink
        * @namespace          sugar.css.flex
        * @type               CssClass
        * @platform           css
        * @status               beta
        * 
        * This class allows specify the flex-shrink property of a flex item to 1
        * 
        * @example        html
        * <div class="s-flex">
        *   <div class="s-flex-item\:shrink"></div>
        * </div>
        */
       `).code(`
        .s-flex-item--shrink {
            flex-shrink: 1;
        }`);
    for (let i = 1; i < 20; i++) {
        vars.comment(() => `/**
                * @name          s-flex-item:order-${i}
                * @namespace          sugar.css.flex
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows specify the order property of a flex item to ${i}
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-flex-item\:order-${i}"></div>
                * </div>
                */
               `).code(`
                .s-flex-item--order-${i} {
                    order: ${i};
                }`);
    }
    for (let i = 1; i < 20; i++) {
        vars.comment(() => `/**
                * @name          s-flex-item:grow-${i}
                * @namespace          sugar.css.flex
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows specify the flex-grow property of a flex item to ${i}
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-flex-item\:grow-${i}"></div>
                * </div>
                */
               `).code(`
                .s-flex-item--grow-${i} {
                    flex-grow: ${i};
                }`);
    }
    for (let i = 1; i < 20; i++) {
        vars.comment(() => `/**
                * @name          s-flex-item:shrink-${i}
                * @namespace          sugar.css.flex
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows specify the flex-shrink property of a flex item to ${i}
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-flex-item\:shrink-${i}"></div>
                * </div>
                */
               `).code(`
                .s-flex-item--shrink-${i} {
                    flex-shrink: ${i};
                }`);
    }
    vars.comment(() => `/**
            * @name          s-flex-item:align-flex-start
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-self property of a flex item to flex-start
            * 
            * @example        html
            * <div class="s-flex">
            *   <div class="s-flex-item\:align-flex-start"></div>
            * </div>
            */
           `).code(`
            .s-flex-item--align-flex-start {
                align-self: flex-start;
            }`);
    vars.comment(() => `/**
            * @name          s-flex-item:align-flex-end
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-self property of a flex item to flex-end
            * 
            * @example        html
            * <div class="s-flex">
            *   <div class="s-flex-item\:align-flex-end"></div>
            * </div>
            */
           `).code(`
            .s-flex-item--align-flex-end {
                align-self: flex-end;
            }`);
    vars.comment(() => `/**
            * @name          s-flex-item:align-center
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-self property of a flex item to center
            * 
            * @example        html
            * <div class="s-flex">
            *   <div class="s-flex-item\:align-center"></div>
            * </div>
            */
           `).code(`
            .s-flex-item--align-center {
                align-self: center;
            }`);
    vars.comment(() => `/**
            * @name          s-flex-item:align-baseline
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-self property of a flex item to baseline
            * 
            * @example        html
            * <div class="s-flex">
            *   <div class="s-flex-item\:align-baseline"></div>
            * </div>
            */
           `).code(`
            .s-flex-item--align-baseline {
                align-self: baseline;
            }`);
    vars.comment(() => `/**
            * @name          s-flex-item:align-stretch
            * @namespace          sugar.css.flex
            * @type               CssClass
            * @platform           css
            * @status               beta
            * 
            * This class allows specify the align-self property of a flex item to stretch
            * 
            * @example        html
            * <div class="s-flex">
            *   <div class="s-flex-item\:align-stretch"></div>
            * </div>
            */
           `).code(`
            .s-flex-item--align-stretch {
                align-self: stretch;
            }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5REFxRDJDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzJEQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtrRUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eURBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OzsrREFLakIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0RBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3VEQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7a0VBS1osT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0RBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3VEQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OENBS2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dEQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3VEQUNoSixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O0tBTXpFLENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztTQVlMLENBQ0osQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztTQVlMLENBQ0osQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztTQVlMLENBQ0osQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztTQVlMLENBQ0osQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztZQVlGLENBQ1AsQ0FBQyxJQUFJLENBQUM7OztjQUdHLENBQUMsQ0FBQztJQUVa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