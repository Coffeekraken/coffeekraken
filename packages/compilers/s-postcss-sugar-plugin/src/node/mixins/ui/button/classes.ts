import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';

class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            values: ['solid', 'gradient', 'outline', 'text'],
            default: ['solid', 'gradient', 'outline', 'text'],
        },
        defaultColor: {
            type: 'String',
            default: __theme().config('ui.button.defaultColor'),
        },
        defaultStyle: {
            type: 'String',
            values: ['solid', 'gradient', 'outline', 'text'],
            default: __theme().config('ui.button.defaultStyle') ?? 'solid',
        },
        scope: {
            type: {
                type: 'Array<String>',
                splitChars: [',', ' '],
            },
            values: ['bare', 'lnf', 'vr', 'tf'],
            default: ['bare', 'lnf', 'vr', 'tf'],
        },
    };
}

export interface IPostcssSugarPluginUiButtonClassesParams {
    styles: ('solid' | 'gradient' | 'outline' | 'text')[];
    defaultStyle: 'solid' | 'gradient' | 'outline' | 'text';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiButtonClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiButtonClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiButtonClassesParams = {
        styles: ['solid', 'gradient', 'outline', 'text'],
        defaultStyle: 'solid',
        defaultColor: 'ui',
        scope: ['bare', 'lnf', 'tf', 'vr'],
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Buttons
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/buttons
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a button
        * 
        * @feature          Support for vertical rhythm through the "s-rhythm:vertical" class
        * @feature          Support for text formatting through the "s-format:text" class
        * @feature          Support for scaling through the "s-scale:..." class
        * @feature          Support for colorizing through the "s-ui:..." class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-btn${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} button style`;
            })
            .join('\n')}
        * @cssClass            s-format:text button             Apply the button style on button tags inside the s-format:text scope 
        * @cssClass            s-btn-group s-btn                Apply the button group style on a buttons wrapper
        * @cssClass            s-rhythm:vertical &              Apply the default vertical rhythm on scoped button(s)
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-mb:50">
            *   <h3 class="s-color:accent s-font:30 s-mb:30">${style} style</h3>
            *   <a tabindex="0" class="s-btn:${style} s-mr:20 s-mb:20"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mr:20 s-mb:20 s-ui:accent"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mr:20 s-mb:20 s-ui:complementary"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mr:20 s-mb:20 s-ui:info"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn:${style} s-mr:20 s-mb:20 s-ui:error"><span>Click me!</span></a>
            *   <span class="s-btn-group s-mr:20 s-mb:20">
            *       <a tabindex="0" class="s-btn:${style}"><span>Click me!</span></a>
            *       <a tabindex="0" class="s-btn:${style}"><span>+</span></a>
            *   </span>
            *   <a tabindex="0" disabled class="s-btn:${style} s-mr:20 s-mb:20"><span>Click me!</span></a>
            * </div>
            * `;
            })
            .join('\n')}
        *
        * <!-- scales -->
        * <div class="s-mb:50">
        *   <h3 class="s-color:accent s-font:30 s-mb:30">Scales</h3>
        *   <a tabindex="0" class="s-btn s-scale:07 s-mr:20"><span>Click me!</span></a>
        *   <a tabindex="0" class="s-btn s-scale:1 s-mr:20"><span>Click me!</span></a>
        *   <a tabindex="0" class="s-btn s-scale:13 s-mr:20"><span>Click me!</span></a>
        * </div>
        * 
        * <!-- Rhythm and text format -->
        * <div class="s-font:30 s-mb:50">
        *   <h3 class="s-color:accent s-font:30 s-mb:30">Vertical rhythm and text formatting</h3>
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
        let cls = `s-btn`;
        if (style !== finalParams.defaultStyle) {
            cls += `--${style}`;
        }

        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" button
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     .${cls} {
        ${finalParams.defaultColor !== 'ui' ? `@sugar.color.remap(ui, ${finalParams.defaultColor});` : ''}
        @sugar.ui.button($style: ${style});
     }`);
    });

    vars.push(`/**
        * @name           s-btn--block
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">block</s-color>" button
        * 
        * @example        html
        * <a class="s-btn--block">I'm a cool block button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-btn--block {
        display: block !important;
      }
    `);

    vars.push(`/**
        * @name           s-btn-group
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">group</s-color>" of buttons
        * 
        * @example        html
        * <span class="s-btn-group">
        *   <a class="s-btn--block">I'm a cool block button</a>
        *   <a class="s-btn--block">+</a>
        * </span>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-btn-group {
          display: inline-flex !important;   
          flex-wrap: nowrap;
          vertical-align: top;
      }
      .s-btn-group > .s-btn {

        &:first-child:not(:last-child) {
          border-inline-end: 1px solid sugar.color(ui, --darken 5);
        }

        &:not(:first-child):not(:last-child),
        &:not(:first-child):not(:last-child):before,
        &:not(:first-child):not(:last-child):after {
            border-radius: 0 !important;
        }
        &:first-child:not(:last-child),
        &:first-child:not(:last-child):before,
        &:first-child:not(:last-child):after {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
        &:last-child:not(:first-child),
        &:last-child:not(:first-child):before,
        &:last-child:not(:first-child):after {
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-inline-start: none !important;
        }
      }
    `);

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.push(`/**
            * @name           s-format:text button
            * @namespace      sugar.css.ui.button
            * @type           CssClass
            * 
            * This class represent a simple button tag in the s-format:text scope
            * 
            * @feature      Support vertical rhythm
            * 
            * @example        html
            * <div class="s-format:text">
            *   <button>
            *       Hello world
            *   </button>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.format.text {
                button {
                    ${finalParams.defaultColor !== 'ui' ? `@sugar.color.remap(ui, ${finalParams.defaultColor});` : ''}
                    @sugar.ui.button($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `);
    }

    replaceWith(vars);
}
