import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
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
                default: __STheme.config('ui.filtrableInput.defaultColor'),
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: (_a = __STheme.config('ui.filtrableInput.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
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
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultStyle: 'solid', defaultColor: 'main', scope: ['bare', 'lnf', 'vr'] }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Filtrable Input
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/filtrable-input
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display an input as filtrable
        * 
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-filtrable-input${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} filtrable input style`;
    })
        .join('\n')}
        * @cssClass            s-rhythm:vertical              Apply the default vertical rhythm on scoped filtered input(s)
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:accent"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:complementary"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:info"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mie:20 s-mbe:20 s-color:error"><span>Click me!</span></a>
            *   <span class="s-btn-group s-mie:20 s-mbe:20">
            *       <a tabindex="0" class="s-btn:${style}"><span>Click me!</span></a>
            *       <a tabindex="0" class="s-btn:${style}"><span>+</span></a>
            *   </span>
            *   <a tabindex="0" disabled class="s-btn:${style} s-mie:20 s-mbe:20"><span>Click me!</span></a>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <!-- scales -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scales</h3>
        *   <a tabindex="0" class="s-btn s-scale:07 s-mie:20"><span>Click me!</span></a>
        *   <a tabindex="0" class="s-btn s-scale:1 s-mie:20"><span>Click me!</span></a>
        *   <a tabindex="0" class="s-btn s-scale:13 s-mie:20"><span>Click me!</span></a>
        * </div>
        * 
        * <!-- Rhythm and text format -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Vertical rhythm and text formatting</h3>
        *   <p class="s-typo:p s-mbe:30">
        *       Text format mean that all the \`button\` tags inside the \`s-format:text\` class scope will be **styled automatically** using the default style and color.
        *   </p>
        *   <div class="s-format:text s-rhythm:vertical">
        *       <button>
        *          ${__faker.name.findName()}
        *       </button>
        *       <br />
        *       <button>
        *           ${__faker.name.findName()}
        *       </button>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    finalParams.styles.forEach((style) => {
        let cls = `s-filtrable-input`;
        if (style !== finalParams.defaultStyle) {
            cls += `--${style}`;
        }
        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.filtrableInput
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" filtrable input
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     .${cls} {
        @sugar.ui.filtrableInput($style: ${style});
     }`);
    });
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.push(`/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.filtrableInput
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.rhythm.vertical {
                .s-filtrable-input {
                    ${__STheme.jsObjectToCssProperties(__STheme.config('ui.filtrableInput.rhythmVertical'))}
                } 
            }
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVzs7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLENBQUM7YUFDN0Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQ0gsTUFBQSxRQUFRLENBQUMsTUFBTSxDQUFDLGdDQUFnQyxDQUFDLG1DQUNqRCxPQUFPO2FBQ2Q7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7YUFDakM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBU0QsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQ2pCLFlBQVksRUFBRSxPQUFPLEVBQ3JCLFlBQVksRUFBRSxNQUFNLEVBQ3BCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQ3pCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBb0JKLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLHFDQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RCx3QkFBd0IsS0FBSyx3QkFBd0IsQ0FBQztJQUMxRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O1VBSWIsV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sV0FBVyxLQUFLOzs2REFFc0IsS0FBSzsrQ0FDbkIsS0FBSzsrQ0FDTCxLQUFLOytDQUNMLEtBQUs7K0NBQ0wsS0FBSzsrQ0FDTCxLQUFLOzttREFFRCxLQUFLO21EQUNMLEtBQUs7O3dEQUVBLEtBQUs7O2VBRTlDLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBa0JGLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7O3NCQUl0QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7S0FReEMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNqQyxJQUFJLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQztRQUM5QixJQUFJLEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxFQUFFO1lBQ3BDLEdBQUcsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDVSxHQUFHOzs7O3lEQUkwQixLQUFLOzs7c0JBR3hDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7Ozs7UUFLN0MsR0FBRzsyQ0FDZ0MsS0FBSztPQUN6QyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQTJCSSxRQUFRLENBQUMsdUJBQXVCLENBQzlCLFFBQVEsQ0FBQyxNQUFNLENBQUMsa0NBQWtDLENBQUMsQ0FDdEQ7OztTQUdaLENBQUMsQ0FBQztLQUNOO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9