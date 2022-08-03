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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSx1Q0FBd0MsU0FBUSxxQkFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO2FBQzFEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUNILE1BQUEsaUJBQVEsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsbUNBQUksT0FBTzthQUNoRTtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2dCQUM3QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQzthQUNqQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFTbUQsNERBQVM7QUFFN0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFDakIsWUFBWSxFQUFFLE9BQU8sRUFD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