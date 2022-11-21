import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssUiRatingClassesInterface extends __SInterface {
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
export { postcssUiRatingClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
    const vars = new CssVars();
    if (finalParams.scope.includes('bare')) {
        vars.code(`
        .s-rating {
            @sugar.ui.rating($scope: bare);
        }
    `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('lnf')) {
        vars.comment(`/**
            * @name          .s-rating[lnf="default"]
            * @namespace          sugar.style.ui.rating
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> rating
            * 
            * @example        html
            * <s-rating></s-rating>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-rating[lnf="default"] {
                @sugar.ui.rating($scope: lnf);
            }`, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(`/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.rating
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-rating></s-rating>
            *   <br />
            *   <s-rating></s-rating>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`@sugar.rhythm.vertical {
                .s-rating {
                    ${__STheme.jsObjectToCssProperties(__STheme.get('ui.rating.rhythmVertical'))}
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sK0JBQWdDLFNBQVEsWUFBWTtJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2FBQ2pDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSwrQkFBK0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV4RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs7S0FJUCxFQUNPO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7OztXQVlELENBQ0YsQ0FBQyxJQUFJLENBQ0Y7OztjQUdFLEVBQ0Y7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRCxDQUNGLENBQUMsSUFBSSxDQUNGOztzQkFFVSxRQUFRLENBQUMsdUJBQXVCLENBQzlCLFFBQVEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FDM0M7OztTQUdaLEVBQ0c7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==