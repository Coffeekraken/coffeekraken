import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssUiFiltrableInputClassesInterface extends __SInterface {
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
                default: __STheme.get('ui.filtrableInput.defaultColor'),
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: (_a = __STheme.get('ui.filtrableInput.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
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
export { postcssUiFiltrableInputClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultStyle: 'solid', defaultColor: 'main', scope: ['bare', 'lnf', 'vr'] }, params);
    const vars = new CssVars();
    // vars.push(`
    //   /**
    //     * @name          Filtrable Input
    //     * @namespace          sugar.style.ui
    //     * @type               Styleguide
    //     * @menu           Styleguide / UI        /styleguide/ui/filtrable-input
    //     * @platform       css
    //     * @status       beta
    //     *
    //     * These classes allows you to display an input as filtrable
    //     *
    //     * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
    //     * @feature          Support for scaling through the \`s-scale:...\` class
    //     * @feature          Support for colorizing through the \`s-color:...\` class
    //     *
    //     * @support          chromium
    //     * @support          firefox
    //     * @support          safari
    //     * @support          edge
    //     *
    //     ${finalParams.styles
    //         .map((style) => {
    //             return ` * @cssClass     s-filtrable-input${
    //                 style === finalParams.defaultStyle ? '' : `:${style}`
    //             }           Apply the ${style} filtrable input style`;
    //         })
    //         .join('\n')}
    //     * @cssClass            s-rhythm:vertical              Apply the default vertical rhythm on scoped filtered input(s)
    //     *
    //     * @example        html
    //     ${finalParams.styles
    //         .map((style) => {
    //             return ` * <!-- ${style} style -->
    //         * <div class="s-mbe:50">
    //         *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
    //         *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20"><span>Click me!</span></a>
    //         *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:accent"><span>Click me!</span></a>
    //         *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:complementary"><span>Click me!</span></a>
    //         *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:info"><span>Click me!</span></a>
    //         *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:error"><span>Click me!</span></a>
    //         *   <span class="s-btn-group s-mie:20 s-mbe:20">
    //         *       <a tabindex="0" class="s-btn:${style}"><span>Click me!</span></a>
    //         *       <a tabindex="0" class="s-btn:${style}"><span>+</span></a>
    //         *   </span>
    //         *   <a tabindex="0" disabled class="s-btn:${style} s-mie:20 s-mbe:20"><span>Click me!</span></a>
    //         * </div>
    //         * `;
    //         })
    //         .join('\n')}
    //     *
    //     * <!-- scales -->
    //     * <div class="s-mbe:50">
    //     *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scales</h3>
    //     *   <a tabindex="0" class="s-btn s-scale:07 s-mie:20"><span>Click me!</span></a>
    //     *   <a tabindex="0" class="s-btn s-scale:1 s-mie:20"><span>Click me!</span></a>
    //     *   <a tabindex="0" class="s-btn s-scale:13 s-mie:20"><span>Click me!</span></a>
    //     * </div>
    //     *
    //     * <!-- Rhythm and text format -->
    //     * <div class="s-font:30 s-mbe:50">
    //     *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Vertical rhythm and text formatting</h3>
    //     *   <p class="s-typo:p s-mbe:30">
    //     *       Text format mean that all the \`button\` tags inside the \`s-format:text\` class scope will be **styled automatically** using the default style and color.
    //     *   </p>
    //     *   <div class="s-format:text s-rhythm:vertical">
    //     *       <button>
    //     *          ${__faker.name.findName()}
    //     *       </button>
    //     *       <br />
    //     *       <button>
    //     *           ${__faker.name.findName()}
    //     *       </button>
    //     *   </div>
    //     * </div>
    //     *
    //     * @since      2.0.0
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    //     */
    // `);
    finalParams.styles.forEach((style) => {
        let cls = `s-filtrable-input`;
        if (style !== finalParams.defaultStyle) {
            cls += `--${style}`;
        }
        vars.comment(`/**
        * @name           ${cls}
        * @namespace          sugar.style.ui.filtrableInput
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" filtrable input
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`).code(`.${cls} {
        @sugar.ui.filtrableInput($style: ${style});
     }`, {
            type: 'CssClass',
        });
    });
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(`/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.filtrableInput
            * @type           CssClass
            * 
            * This class represent some filtrable inputs in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            *   <br />
            *   <button class="s-btn">
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`@sugar.rhythm.vertical {
                .s-filtrable-input {
                    ${__STheme.jsObjectToCssProperties(__STheme.get('ui.filtrableInput.rhythmVertical'))}
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUM7YUFDMUQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQ0gsTUFBQSxRQUFRLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLG1DQUFJLE9BQU87YUFDaEU7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7YUFDakM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBU0QsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxH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