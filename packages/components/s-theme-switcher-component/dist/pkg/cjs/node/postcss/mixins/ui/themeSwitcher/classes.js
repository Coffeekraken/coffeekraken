"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiThemeSwitcherClassesInterface extends s_interface_1.default {
    static get _definition() {
        var _a;
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: (_a = s_theme_1.default.get('ui.themeSwitcher.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
            },
            defaultColor: {
                type: 'String',
                default: s_theme_1.default.get('ui.themeSwitcher.defaultColor'),
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
exports.interface = postcssUiThemeSwitcherClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultStyle: 'solid', defaultColor: 'main', scope: ['bare', 'lnf'] }, params);
    const vars = new CssVars();
    if (finalParams.scope.includes('bare')) {
        vars.code(`
        .s-theme-switcher {
            @sugar.ui.themeSwitcher($scope: bare);
        }
    `, {
            type: 'CssClass',
        });
    }
    if (finalParams.styles.includes(finalParams.defaultStyle) &&
        finalParams.scope.includes('lnf')) {
        vars.comment(`/**
            * @name          .s-theme-switcher[lnf="default"]
            * @namespace          sugar.style.ui.themeSwitcher
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> theme switcher
            * 
            * @example        html
            * <s-theme-switcher></s-theme-switcher>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-theme-switcher[lnf="default"] {
                @sugar.ui.themeSwitcher($style: ${finalParams.defaultStyle}, $scope: lnf);
            }`, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(`/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.themeSwitcher
            * @type           CssClass
            * 
            * This class represent a theme switcher in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-theme-switcher></s-theme-switcher>
            *   <br />
            *   <s-theme-switcher></s-theme-switcher>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`@sugar.rhythm.vertical {
                .s-theme-switcher {
                    ${s_theme_1.default.jsObjectToCssProperties(s_theme_1.default.get('ui.themeSwitcher.rhythmVertical'))}
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSxzQ0FBdUMsU0FBUSxxQkFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQ0gsTUFBQSxpQkFBUSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxtQ0FBSSxPQUFPO2FBQy9EO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQzthQUN6RDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQzthQUNqQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFTa0QsMkRBQVM7QUFFNUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFDakIsWUFBWSxFQUFFLE9BQU8sRUFDckIsWUFBWSxFQUFFLE1BQU0sRUFDcEIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUNMOzs7O0tBSVAsRUFDTztZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztLQUNMO0lBRUQsSUFDSSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQ3JELFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUNuQztRQUNFLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7OztXQVlELENBQ0YsQ0FBQyxJQUFJLENBQ0Y7O2tEQUVzQyxXQUFXLENBQUMsWUFBWTtjQUM1RCxFQUNGO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkQsQ0FDRixDQUFDLElBQUksQ0FDRjs7c0JBRVUsaUJBQVEsQ0FBQyx1QkFBdUIsQ0FDOUIsaUJBQVEsQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FDbEQ7OztTQUdaLEVBQ0c7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFsR0QsNEJBa0dDIn0=