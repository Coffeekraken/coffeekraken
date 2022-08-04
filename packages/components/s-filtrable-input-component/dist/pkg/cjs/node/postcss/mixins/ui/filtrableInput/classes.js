"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiFiltrableInputClassesInterface extends s_interface_1.default {
    static get _definition() {
        var _a;
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultColor: {
                type: 'String',
                default: s_theme_1.default.get('ui.filtrableInput.defaultColor'),
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: (_a = s_theme_1.default.get('ui.filtrableInput.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
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
exports.interface = postcssUiFiltrableInputClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultStyle: 'solid', defaultColor: 'main', scope: ['bare', 'lnf', 'vr'] }, params);
    const vars = new CssVars();
    vars.code(`
        [lnf="default"] > .s-filtrable-input {
            @sugar.ui.filtrableInput($scope: bare);
        }
        `, {
        type: 'CssClass',
    });
    if (finalParams.styles.includes(finalParams.defaultStyle)) {
        // @TODO            example
        vars.comment(`/**
            * @name           [lnf="default"] > .s-filtrable-input
            * @namespace          sugar.style.ui.filtrableInput
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color>" filtrable input
            * 
            * @example        html
            * Example not available for now...
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
                [lnf="default"] > .s-filtrable-input {
                    @sugar.color(${finalParams.defaultColor});
                    @sugar.ui.filtrableInput($style: solid, $scope: lnf);
                }`, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        // @TODO            example
        vars.comment(`/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.filtrableInput
            * @type           CssClass
            * 
            * This class represent some filtrable inputs in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   example not available for now...
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`@sugar.rhythm.vertical {
                .s-filtrable-input {
                    ${s_theme_1.default.jsObjectToCssProperties(s_theme_1.default.get('ui.filtrableInput.rhythmVertical'))}
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSx1Q0FBd0MsU0FBUSxxQkFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQzFEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUNILE1BQUEsaUJBQVEsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsbUNBQUksT0FBTzthQUNoRTtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQzthQUNqQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFTbUQsNERBQVM7QUFFN0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFDakIsWUFBWSxFQUFFLE9BQU8sRUFDckIsWUFBWSxFQUFFLE1BQU0sRUFDcEIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFDekIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs7U0FJQyxFQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBRUYsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDdkQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7OztXQVlELENBQ0YsQ0FBQyxJQUFJLENBQ0Y7O21DQUV1QixXQUFXLENBQUMsWUFBWTs7a0JBRXpDLEVBQ047WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7Ozs7O1dBY0QsQ0FDRixDQUFDLElBQUksQ0FDRjs7c0JBRVUsaUJBQVEsQ0FBQyx1QkFBdUIsQ0FDOUIsaUJBQVEsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FDbkQ7OztTQUdaLEVBQ0c7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE5RkQsNEJBOEZDIn0=