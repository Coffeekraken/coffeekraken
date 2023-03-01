import __SInterface from '@coffeekraken/s-interface';
class postcssUiCardClassesInterface extends __SInterface {
    static get _definition() {
        return {
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
export { postcssUiCardClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sNkJBQThCLFNBQVEsWUFBWTtJQUNwRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2FBQ2pDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSw2QkFBNkIsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV0RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixTQUFTLE9BQU8sQ0FBQyxNQUFNO1FBQ25CLE9BQU8sbUJBQW1CLE1BQU0sQ0FBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBa0JyQixDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQWdDSixPQUFPLENBQUM7UUFDTixLQUFLLEVBQUUsUUFBUTtLQUNsQixDQUFDOzs7VUFHQSxPQUFPLENBQUM7UUFDTixLQUFLLEVBQUUsbUJBQW1CO0tBQzdCLENBQUM7OztVQUdBLE9BQU8sQ0FBQztRQUNOLEtBQUssRUFBRSx5QkFBeUI7S0FDbkMsQ0FBQzs7O1VBR0EsT0FBTyxDQUFDO1FBQ04sS0FBSyxFQUFFLDJCQUEyQjtLQUNyQyxDQUFDOzs7OztLQUtMLENBQ0EsQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FDTDs7OzthQUlDLEVBQ0Q7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Y0FRRSxPQUFPLENBQUM7WUFDTixLQUFLLEVBQUUsUUFBUTtTQUNsQixDQUFDOzs7O1dBSUgsQ0FDRixDQUFDLElBQUksQ0FDRjs7O2NBR0UsRUFDRjtZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztLQUNMO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9