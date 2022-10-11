import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssUiCardClassesInterface extends __SInterface {
    static get _definition() {
        var _a;
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid'],
                default: (_a = __STheme.get('ui.card.defaultLnf')) !== null && _a !== void 0 ? _a : 'solid',
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.card.defaultColor'),
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
    const finalParams = Object.assign({ lnfs: ['solid'], defaultLnf: 'solid', defaultColor: 'main', scope: ['bare', 'lnf'] }, params);
    const vars = new CssVars();
    if (finalParams.scope.includes('bare')) {
        vars.code(`
                .s-card {
                    @sugar.ui.card($scope: bare);
                }
            `, {
            type: 'CssClass',
        });
    }
    if (finalParams.lnfs.includes(finalParams.defaultLnf) &&
        finalParams.scope.includes('lnf')) {
        vars.comment(`/**
            * @name           .s-card:not(.s-bare)
            * @namespace          sugar.ui.card
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> card
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
            .s-card:not(.s-bare) {
                @sugar.ui.card($scope: lnf, $lnf: ${finalParams.defaultLnf});
            }`, {
            type: 'CssClass',
        });
    }
    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(`
            .s-card:not(.s-bare) {
                @sugar.color(${finalParams.defaultColor});
            }
        `, { type: 'CssClass' });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sNkJBQThCLFNBQVEsWUFBWTtJQUNwRCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsTUFBQSxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLG1DQUFJLE9BQU87YUFDekQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDaEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7YUFDakM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBU0QsT0FBTyxFQUFFLDZCQUE2QixJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXRELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNmLFVBQVUsRUFBRSxPQUFPLEVBQ25CLFlBQVksRUFBRSxNQUFNLEVBQ3BCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FDTDs7OzthQUlDLEVBQ0Q7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELElBQ0ksV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUNqRCxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFDbkM7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7Ozs7O1dBZ0JELENBQ0YsQ0FBQyxJQUFJLENBQ0Y7O29EQUV3QyxXQUFXLENBQUMsVUFBVTtjQUM1RCxFQUNGO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxnQkFBZ0I7SUFDaEIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUNMOzsrQkFFbUIsV0FBVyxDQUFDLFlBQVk7O1NBRTlDLEVBQ0csRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7S0FDTDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==