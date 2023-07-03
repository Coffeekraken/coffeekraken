import __SInterface from '@coffeekraken/s-interface';
class postcssUiCardClassesInterface extends __SInterface {
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
export { postcssUiCardClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sNkJBQThCLFNBQVEsWUFBWTtJQUNwRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKLFVBQVU7b0JBQ1Ysa0JBQWtCO29CQUNsQixZQUFZO29CQUNaLG9CQUFvQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFVBQVU7b0JBQ1Ysa0JBQWtCO29CQUNsQixZQUFZO29CQUNaLG9CQUFvQjtpQkFDdkI7YUFDSjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQzthQUNqQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFZRCxPQUFPLEVBQUUsNkJBQTZCLElBQUksU0FBUyxFQUFFLENBQUM7QUFFdEQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsU0FBUyxFQUFFO1lBQ1AsVUFBVTtZQUNWLGtCQUFrQjtZQUNsQixZQUFZO1lBQ1osb0JBQW9CO1NBQ3ZCLEVBQ0QsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsU0FBUyxPQUFPLENBQUMsTUFBTTtRQUNuQixPQUFPLG1CQUFtQixNQUFNLENBQUMsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQWtCckIsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFnQ0osT0FBTyxDQUFDO1FBQ04sS0FBSyxFQUFFLFFBQVE7S0FDbEIsQ0FBQzs7O1VBR0EsT0FBTyxDQUFDO1FBQ04sS0FBSyxFQUFFLG1CQUFtQjtLQUM3QixDQUFDOzs7VUFHQSxPQUFPLENBQUM7UUFDTixLQUFLLEVBQUUseUJBQXlCO0tBQ25DLENBQUM7OztVQUdBLE9BQU8sQ0FBQztRQUNOLEtBQUssRUFBRSwyQkFBMkI7S0FDckMsQ0FBQzs7Ozs7S0FLTCxDQUNBLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs7YUFJQyxFQUNEO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FDUjs2Q0FDNkIsU0FBUzs7OztpRUFJVyxTQUFTOzs7a0JBR3hELE9BQU8sQ0FBQztnQkFDTixLQUFLLEVBQUUsVUFBVSxTQUFTLEVBQUU7YUFDL0IsQ0FBQzs7OztlQUlILENBQ0YsQ0FBQyxJQUFJLENBQ0Y7MkJBQ1csU0FBUztpREFDYSxTQUFTO2tCQUN4QyxFQUNGO2dCQUNJLElBQUksRUFBRSxVQUFVO2FBQ25CLENBQ0osQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7O2NBUUUsT0FBTyxDQUFDO1lBQ04sS0FBSyxFQUFFLFFBQVE7U0FDbEIsQ0FBQzs7OztXQUlILENBQ0YsQ0FBQyxJQUFJLENBQ0Y7OztjQUdFLEVBQ0Y7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==