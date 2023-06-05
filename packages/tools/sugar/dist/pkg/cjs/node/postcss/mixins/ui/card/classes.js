"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiCardClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            direction: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: [
                    'vertical',
                    'vertical-reverse',
                    'horizontal',
                    'horizontal-reverse',
                ],
                default: [
                    'vertical',
                    'vertical-reverse',
                    'horizontal',
                    'horizontal-reverse',
                ],
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr'],
                default: ['bare', 'lnf', 'vr'],
            },
        };
    }
}
exports.interface = postcssUiCardClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ direction: [
            'vertical',
            'vertical-reverse',
            'horizontal',
            'horizontal-reverse',
        ], scope: ['bare', 'lnf'] }, params);
    const vars = new CssVars();
    function cardTpl(params) {
        return `*   <div class="${params.class}">
                *     <div class="s-card_media s-media-container">
                *         <img class="s-card_img s-media" src="https://picsum.photos/1600/900" title="..." alt="..." />
                *     </div>
                *     <div class="s-card_content s-spacing:30">
                *         <h1 class="s-card_title s-typo:h3">
                *             Hello world
                *         </h1>
                *         <p class="s-card_lead s-typo:lead s-tc:accent">
                *             Lorem ipsum dolor sit amet
                *         </p>
                *         <p class="s-card_text s-typo:p">
                *             Ullamco aute ex mollit enim eu exercitation excepteur consequat laborum. Incididunt eiusmod commodo officia minim consequat enim occaecat est elit cillum. Incididunt pariatur duis ex sint. Qui aliqua pariatur cupidatat exercitation quis ea eu officia. Deserunt esse magna occaecat consectetur. Irure qui velit dolor ipsum qui cillum adipisicing reprehenderit.
                *         </p>
                *         <div class="s-card_cta">
                *            <a class="s-btn s-color:accent">Click me!</a> 
                *         </div>
                *     </div>
                * </div>`;
    }
    vars.comment(() => `
      /**
        * @name          Card
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/card
        * @platform       css
        * @status       beta
        * 
        * These classes allows to display nice card with options like direction, spacing, etc...
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @install          css
        * \\@sugar.ui.card.classes;
        * 
        * .my-card {
        *   \@sugar.ui.card;
        * }
        * 
        * @cssClass             s-card                       Specify that the card has to be displayed verticaly
        * @cssClass             s-card:vertical            Specify that the card has to be displayed verticaly
        * @cssClass             s-card:horizontal            Specify that the card has to be displayed horizontaly
        * @cssClass             s-card:vertical-reverse            Specify that the card has to be displayed verticaly reversed
        * @cssClass             s-card:horizontal-reverse            Specify that the card has to be displayed horizontaly reverses
        * 
        * @snippet          @sugar.ui.card.classes
        * 
        * @example          html            Default vertical
        ${cardTpl({
        class: 's-card',
    })}
        * 
        * @example          html            Horizontal
        ${cardTpl({
        class: 's-card:horizontal',
    })}
        *
        * @example          html            Vertical reverse
        ${cardTpl({
        class: 's-card:vertical-reverse',
    })}
        *
        * @example          html            Horizontal reverse
        ${cardTpl({
        class: 's-card:horizontal-reverse',
    })}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.code(`
                .s-card {
                    @sugar.ui.card($scope: bare);
                }
            `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('bare')) {
        finalParams.direction.forEach((direction) => {
            vars.comment(`/**
                * @name           .s-card--${direction}
                * @namespace          sugar.ui.card
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${direction}</s-color> card
                * 
                * @example        html
                ${cardTpl({
                class: `s-card:${direction}`,
            })}
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`).code(`
                .s-card--${direction} {
                    @sugar.ui.card($direction: ${direction}, $scope: direction);
                }`, {
                type: 'CssClass',
            });
        });
    }
    if (finalParams.scope.includes('lnf')) {
        vars.comment(`/**
            * @name           .s-card
            * @namespace          sugar.ui.card
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> card
            * 
            * @example        html
            ${cardTpl({
            class: 's-card',
        })}
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-card:not(.s-bare) {
                @sugar.ui.card($scope: lnf);
            }`, {
            type: 'CssClass',
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLDZCQUE4QixTQUFRLHFCQUFZO0lBQ3BELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osVUFBVTtvQkFDVixrQkFBa0I7b0JBQ2xCLFlBQVk7b0JBQ1osb0JBQW9CO2lCQUN2QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsVUFBVTtvQkFDVixrQkFBa0I7b0JBQ2xCLFlBQVk7b0JBQ1osb0JBQW9CO2lCQUN2QjthQUNKO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2FBQ2pDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVl5QyxrREFBUztBQUVuRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLFNBQVMsRUFBRTtZQUNQLFVBQVU7WUFDVixrQkFBa0I7WUFDbEIsWUFBWTtZQUNaLG9CQUFvQjtTQUN2QixFQUNELEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLFNBQVMsT0FBTyxDQUFDLE1BQU07UUFDbkIsT0FBTyxtQkFBbUIsTUFBTSxDQUFDLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFrQnJCLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBZ0NKLE9BQU8sQ0FBQztRQUNOLEtBQUssRUFBRSxRQUFRO0tBQ2xCLENBQUM7OztVQUdBLE9BQU8sQ0FBQztRQUNOLEtBQUssRUFBRSxtQkFBbUI7S0FDN0IsQ0FBQzs7O1VBR0EsT0FBTyxDQUFDO1FBQ04sS0FBSyxFQUFFLHlCQUF5QjtLQUNuQyxDQUFDOzs7VUFHQSxPQUFPLENBQUM7UUFDTixLQUFLLEVBQUUsMkJBQTJCO0tBQ3JDLENBQUM7Ozs7O0tBS0wsQ0FDQSxDQUFDO0lBRUYsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUNMOzs7O2FBSUMsRUFDRDtZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztLQUNMO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNwQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQ1I7NkNBQzZCLFNBQVM7Ozs7aUVBSVcsU0FBUzs7O2tCQUd4RCxPQUFPLENBQUM7Z0JBQ04sS0FBSyxFQUFFLFVBQVUsU0FBUyxFQUFFO2FBQy9CLENBQUM7Ozs7ZUFJSCxDQUNGLENBQUMsSUFBSSxDQUNGOzJCQUNXLFNBQVM7aURBQ2EsU0FBUztrQkFDeEMsRUFDRjtnQkFDSSxJQUFJLEVBQUUsVUFBVTthQUNuQixDQUNKLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7OztjQVFFLE9BQU8sQ0FBQztZQUNOLEtBQUssRUFBRSxRQUFRO1NBQ2xCLENBQUM7Ozs7V0FJSCxDQUNGLENBQUMsSUFBSSxDQUNGOzs7Y0FHRSxFQUNGO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBaExELDRCQWdMQyJ9