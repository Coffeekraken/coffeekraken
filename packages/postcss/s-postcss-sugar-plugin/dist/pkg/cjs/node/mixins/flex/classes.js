"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name           classes
 * @as              @sugar.flex.classes
 * @namespace      node.mixin.flex
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the flex helper classes like s-flex, s-flex:align-top, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.flex.classes
 *
 * @example        css
 * \@sugar.flex.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFlexClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginFlexClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Flexbox
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/flexbox
        * @platform       css
        * @status       beta
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
        * \\@sugar.flex.classes;
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
        *     <div class="s-bg:main s-width:50 s-p:30">${faker_1.default.name.findName()}</div>
        *     <div class="s-bg:accent s-width:50 s-p:30">${faker_1.default.name.findName()}</div>
        *     <div class="s-bg:complementary s-width:50 s-p:30">${faker_1.default.name.findName()}</div>
        *     <div class="s-bg:info s-width:50 s-p:30">${faker_1.default.name.findName()}</div>
        *   </div>
        * 
        * @example        html          Grow
        *   <div class="s-flex:row:nowrap s-radius">
        *     <div class="s-flex-item:grow s-bg:main s-p:30">${faker_1.default.name.findName()}</div>
        *     <div class="s-bg:accent s-p:30">${faker_1.default.name.findName()}</div>
        *     <div class="s-bg:complementary s-p:30">${faker_1.default.name.findName()}</div>
        *   </div>
        * 
        * @example      html          Orders
        *   <div class="s-flex:row:nowrap s-radius">
        *     <div class="s-flex-item:order-3 s-bg:main s-p:30">${faker_1.default.name.findName()}</div>
        *     <div class="s-bg:accent s-p:30">${faker_1.default.name.findName()}</div>
        *     <div class="s-bg:complementary s-p:30">${faker_1.default.name.findName()}</div>
        *   </div>
        * 
        * @example          html            Aligns
        *   <div class="s-flex:row:nowrap:align-end s-radius">
        *     <div class="s-bg:main s-p:30">${faker_1.default.name.findName()}</div>
        *     <div class="s-bg:accent s-p:30">${faker_1.default.name.findName()}<br />${faker_1.default.name.findName()}<br />${faker_1.default.name.findName()}<br />${faker_1.default.name.findName()}<br />${faker_1.default.name.findName()}</div>
        *     <div class="s-bg:complementary s-p:30">${faker_1.default.name.findName()}</div>
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
            * @name          s-flex
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:row
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:row-reverse
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:column
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:column-reverse
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:nowrap
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:wrap
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:wrap-reverse
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:justify-start
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:justify-flex-start
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:justify-end
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:justify-flex-end
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:justify-center
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:justify-space-between
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:justify-space-around
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:justify-space-evenly
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:justify-stretch
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:align-start
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:align-flex-start
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:align-end
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:align-flex-end
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:align-center
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex:align-baseline
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
        * @name          s-flex-item:grow
        * @namespace          sugar.style.flex
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
        }`, { type: 'CssClass' });
    vars.comment(() => `/**
        * @name          s-flex-item:shrink
        * @namespace          sugar.style.flex
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
        }`, { type: 'CssClass' });
    for (let i = 1; i < 20; i++) {
        vars.comment(() => `/**
                * @name          s-flex-item:order-${i}
                * @namespace          sugar.style.flex
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
                }`, { type: 'CssClass' });
    }
    for (let i = 1; i < 20; i++) {
        vars.comment(() => `/**
                * @name          s-flex-item:grow-${i}
                * @namespace          sugar.style.flex
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
                }`, { type: 'CssClass' });
    }
    for (let i = 1; i < 20; i++) {
        vars.comment(() => `/**
                * @name          s-flex-item:shrink-${i}
                * @namespace          sugar.style.flex
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
                }`, { type: 'CssClass' });
    }
    vars.comment(() => `/**
            * @name          s-flex-item:align-flex-start
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex-item:align-flex-end
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex-item:align-center
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex-item:align-baseline
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-flex-item:align-stretch
            * @namespace          sugar.style.flex
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
            }`, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrREFBNEI7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLHFCQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSWtELDJEQUFTO0FBRTVELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lEQXdEMkMsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MkRBQ3JCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2tFQUNoQixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5REFDaEMsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OytEQUtqQixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnREFDdEMsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7dURBQ2hCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OztrRUFLWixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnREFDekMsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7dURBQ2hCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs4Q0FLaEMsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVB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