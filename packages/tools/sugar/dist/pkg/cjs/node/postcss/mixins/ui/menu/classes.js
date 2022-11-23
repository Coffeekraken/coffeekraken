"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiCodeExampleClassesInterface extends s_interface_1.default {
    static get _definition() {
        var _a, _b;
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            types: {
                type: 'String[]',
                values: ['primary', 'mobile'],
                default: ['primary', 'mobile'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid'],
                default: (_a = s_theme_1.default.get('ui.menu.defaultLnf')) !== null && _a !== void 0 ? _a : 'solid',
            },
            defaultType: {
                type: 'String',
                values: ['primary', 'mobile'],
                default: (_b = s_theme_1.default.get('ui.menu.defaultType')) !== null && _b !== void 0 ? _b : 'primary',
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('color')),
                default: s_theme_1.default.get('ui.menu.defaultColor'),
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
exports.interface = postcssUiCodeExampleClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: ['solid'], types: ['primary', 'mobile'], defaultLnf: 'solid', defaultType: 'primary', defaultColor: 'main', scope: ['bare', 'lnf'] }, params);
    const vars = new CssVars();
    if (finalParams.scope.includes('bare')) {
        vars.code(`
                .s-menu {
                    @sugar.ui.menu($scope: bare, $type: ${finalParams.defaultType});
                }
            `, {
            type: 'CssClass',
        });
    }
    if (finalParams.lnfs.includes(finalParams.defaultLnf) &&
        finalParams.scope.includes('lnf')) {
        vars.comment(`/**
            * @name           .s-menu:not(.s-bare)
            * @namespace          sugar.ui.menu
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> code example
            * 
            * @example        html
            * <s-menu>
            *   <template lang="js">
            *       console.log('hello world');
            *   </template>
            * </s-menu>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-menu:not(.s-bare) {
                @sugar.ui.menu($scope: lnf, $lnf: ${finalParams.defaultLnf}, $type: ${finalParams.defaultType});
            }`, {
            type: 'CssClass',
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSxvQ0FBcUMsU0FBUSxxQkFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7YUFDakM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsTUFBQSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxtQ0FBSSxPQUFPO2FBQ3pEO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxNQUFBLGlCQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLG1DQUFJLFNBQVM7YUFDNUQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUNoRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQzthQUNqQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFXZ0QseURBQVM7QUFFMUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFDZixLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQzVCLFVBQVUsRUFBRSxPQUFPLEVBQ25CLFdBQVcsRUFBRSxTQUFTLEVBQ3RCLFlBQVksRUFBRSxNQUFNLEVBQ3BCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FDTDs7MERBRThDLFdBQVcsQ0FBQyxXQUFXOzthQUVwRSxFQUNEO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxJQUNJLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDakQsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQ25DO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRCxDQUNGLENBQUMsSUFBSSxDQUNGOztvREFFd0MsV0FBVyxDQUFDLFVBQVUsWUFBWSxXQUFXLENBQUMsV0FBVztjQUMvRixFQUNGO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBdEVELDRCQXNFQyJ9