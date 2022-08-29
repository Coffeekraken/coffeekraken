import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssUiThemeSwitcherClassesInterface extends __SInterface {
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
                default: (_a = __STheme.get('ui.themeSwitcher.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.themeSwitcher.defaultColor'),
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
export { postcssUiThemeSwitcherClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
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
    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(() => `
            .s-theme-switcher:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `, { type: 'CssClass' });
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
                    ${__STheme.jsObjectToCssProperties(__STheme.get('ui.themeSwitcher.rhythmVertical'))}
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sc0NBQXVDLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQ0gsTUFBQSxRQUFRLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLG1DQUFJLE9BQU87YUFDL0Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUM7YUFDekQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7YUFDakM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBU0QsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNqQixZQUFZLEVBQUUsT0FBTyxFQUNyQixZQUFZLEVBQUUsTUFBTSxFQUNwQixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs7S0FJUCxFQUNPO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxJQUNJLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDckQsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQ25DO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7O1dBWUQsQ0FDRixDQUFDLElBQUksQ0FDRjs7a0RBRXNDLFdBQVcsQ0FBQyxZQUFZO2NBQzVELEVBQ0Y7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELGdCQUFnQjtJQUNoQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxFQUFFLENBQUM7OytCQUVhLFdBQVcsQ0FBQyxZQUFZOztTQUU5QyxFQUNHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkQsQ0FDRixDQUFDLElBQUksQ0FDRjs7c0JBRVUsUUFBUSxDQUFDLHVCQUF1QixDQUM5QixRQUFRLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQ2xEOzs7U0FHWixFQUNHO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=