import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

class postcssUiFiltrableInputClassesInterface extends __SInterface {
    static get _definition() {
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
                default:
                    __STheme.config('ui.filtrableInput.defaultStyle') ??
                    'solid',
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

export interface IPostcssUiFiltrableInputClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssUiFiltrableInputClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssUiFiltrableInputClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiFiltrableInputClassesParams = {
        styles: ['solid'],
        defaultStyle: 'solid',
        defaultColor: 'main',
        scope: ['bare', 'lnf', 'vr'],
        ...params,
    };

    const vars: string[] = [];

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
                return ` * @cssClass     s-filtrable-input${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} filtrable input style`;
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
            @sugar.rhythm.vertical {
                .s-filtrable-input {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.config('ui.filtrableInput.rhythmVertical'),
                    )}
                } 
            }
        `);
    }

    return vars;
}
