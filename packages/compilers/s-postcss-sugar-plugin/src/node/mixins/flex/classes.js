import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.flex
 * @type           PostcssMixin
 * @platform      css
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginFlexClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginFlexClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Flex
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/flex
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
        * @example        html
        * <!-- Simple grid -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Simple grid</h3>
        *   <div class="s-flex:row:wrap">
        *     <div class="s-bg:main s-width:50 s-p:20">${__faker.name.findName()}</div>
        *     <div class="s-bg:accent s-width:50 s-p:20">${__faker.name.findName()}</div>
        *     <div class="s-bg:complementary s-width:50 s-p:20">${__faker.name.findName()}</div>
        *     <div class="s-bg:info s-width:50 s-p:20">${__faker.name.findName()}</div>
        *   </div>
        * </div>
        * 
        * <!-- Grow -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Grow</h3>
        *   <div class="s-flex:row:nowrap">
        *     <div class="s-bg:main s-p:20 s-flex-item:grow">${__faker.name.findName()}</div>
        *     <div class="s-bg:accent s-p:20">${__faker.name.findName()}</div>
        *     <div class="s-bg:complementary s-p:20">${__faker.name.findName()}</div>
        *   </div>
        * </div>
        * 
        * <!-- Order -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Order</h3>
        *   <div class="s-flex:row:nowrap">
        *     <div class="s-bg:main s-p:20 s-flex-item:order-3">${__faker.name.findName()}</div>
        *     <div class="s-bg:accent s-p:20">${__faker.name.findName()}</div>
        *     <div class="s-bg:complementary s-p:20">${__faker.name.findName()}</div>
        *   </div>
        * </div>
        * 
        * <!-- Align -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Align</h3>
        *   <div class="s-flex:row:nowrap:align-end">
        *     <div class="s-bg:main s-p:20">${__faker.name.findName()}</div>
        *     <div class="s-bg:accent s-p:20">${__faker.name.findName()}<br />${__faker.name.findName()}<br />${__faker.name.findName()}<br />${__faker.name.findName()}<br />${__faker.name.findName()}</div>
        *     <div class="s-bg:complementary s-p:20">${__faker.name.findName()}</div>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
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
            .s-flex {
                display: flex;
            }`);
    vars.push(`/**
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
            .s-flex--row {
                flex-direction: row;
            }`);
    vars.push(`/**
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
            .s-flex--row-reverse {
                flex-direction: row-reverse;
            }`);
    vars.push(`/**
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
            .s-flex--column {
                flex-direction: column;
            }`);
    vars.push(`/**
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
            .s-flex--column-reverse {
                flex-direction: column-reverse;
            }`);
    vars.push(`/**
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
            .s-flex--nowrap {
                flex-wrap: nowrap;
            }`);
    vars.push(`/**
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
            .s-flex--wrap {
                flex-wrap: wrap;
            }`);
    vars.push(`/**
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
            .s-flex--wrap-reverse {
                flex-wrap: wrap-reverse;
            }`);
    vars.push(`/**
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
            .s-flex--justify-start {
                justify-content: start;
            }`);
    vars.push(`/**
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
            .s-flex--justify-flex-start {
                justify-content: flex-start;
            }`);
    vars.push(`/**
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
            .s-flex--justify-end {
                justify-content: end;
            }`);
    vars.push(`/**
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
            .s-flex--justify-flex-end {
                justify-content: flex-end;
            }`);
    vars.push(`/**
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
            .s-flex--justify-center {
                justify-content: center;
            }`);
    vars.push(`/**
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
            .s-flex--justify-space-between {
                justify-content: space-between;
            }`);
    vars.push(`/**
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
            .s-flex--justify-space-around {
                justify-content: space-around;
            }`);
    vars.push(`/**
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
            .s-flex--justify-space-evenly {
                justify-content: space-evenly;
            }`);
    vars.push(`/**
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
            .s-flex--justify-stretch {
                justify-content: stretch;
            }`);
    vars.push(`/**
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
            .s-flex--align-start {
                align-items: start;
            }`);
    vars.push(`/**
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
            .s-flex--align-flex-start {
                align-items: flex-start;
            }`);
    vars.push(`/**
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
            .s-flex--align-end {
                align-items: end;
            }`);
    vars.push(`/**
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
            .s-flex--align-flex-end {
                align-items: flex-end;
            }`);
    vars.push(`/**
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
            .s-flex--align-center {
                align-items: center;
            }`);
    vars.push(`/**
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
            .s-flex--align-baseline {
                align-items: baseline;
            }`);
    vars.push(`/**
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
        .s-flex-item--grow {
            flex-grow: 1;
        }`);
    vars.push(`/**
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
        .s-flex-item--shrink {
            flex-shrink: 1;
        }`);
    for (let i = 1; i < 20; i++) {
        vars.push(`/**
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
                .s-flex-item--order-${i} {
                    order: ${i};
                }`);
    }
    for (let i = 1; i < 20; i++) {
        vars.push(`/**
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
                .s-flex-item--grow-${i} {
                    flex-grow: ${i};
                }`);
    }
    for (let i = 1; i < 20; i++) {
        vars.push(`/**
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
                .s-flex-item--shrink-${i} {
                    flex-shrink: ${i};
                }`);
    }
    vars.push(`/**
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
            .s-flex-item--align-flex-start {
                align-self: flex-start;
            }`);
    vars.push(`/**
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
            .s-flex-item--align-flex-end {
                align-self: flex-end;
            }`);
    vars.push(`/**
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
            .s-flex-item--align-center {
                align-self: center;
            }`);
    vars.push(`/**
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
            .s-flex-item--align-baseline {
                align-self: baseline;
            }`);
    vars.push(`/**
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
            .s-flex-item--align-stretch {
                align-self: stretch;
            }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eURBd0QyQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTsyREFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7a0VBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lEQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7K0RBUWpCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dEQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt1REFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7O2tFQVFaLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dEQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt1REFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFR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