import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';

class postcssSugarPluginUiRadioClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            values: ['solid'],
            default: ['solid'],
        },
        defaultStyle: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.radio.defaultStyle'),
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

export interface IPostcssSugarPluginUiRangeClassesParams {
    styles: 'solid'[];
    defaultColor: string;
    defaultStyle: 'solid';
    scope: ('bare' | 'lnf' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiRadioClassesInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    jsObjectToCssProperties,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiRangeClassesParams>;
    atRule: any;
    applyNoScopes: Function;
    jsObjectToCssProperties: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiRangeClassesParams = {
        styles: ['solid'],
        defaultColor: 'ui',
        defaultStyle: 'solid',
        scope: [],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Radio
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/radio
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice radio in your forms
        * 
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
                return ` * @cssClass     s-radio${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} radio style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <label class="s-mbe:30 s-label">
            *     <input type="radio" checked class="s-radio" name="radio-style-${style}" value="hello 1" checked />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="radio" class="s-radio s-color:accent" name="radio-style-${style}" value="hello 2" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="radio" class="s-radio s-color:accent" name="radio-style-${style}" value="hello 3" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * <!-- Colors -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Colors (non-exhaustive)</h3>
        *   <label class="s-mbe:30 s-label">
        *     <input type="radio" checked class="s-radio" name="radio-style-color" value="hello 1" checked />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-color" value="hello 2" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="radio" class="s-radio s-color:complementary" name="radio-style-color" value="hello 3" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="radio" disabled class="s-radio s-color:error" name="radio-style-color" value="hello 4" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        * </div>
        * 
        * <!-- LTR -->
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">LTR Support</h3>
        *   <label class="s-mbe:30 s-label">
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-ltr" value="hello 1" checked />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-ltr" value="hello 2" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-ltr" value="hello 3" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scale</h3>
        *   <label class="s-mbe:30 s-label s-scale:07">
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-scale" value="hello 1" checked />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 2" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:13">
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        * </div>
        * 
        * <!-- Text format -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Text format</h3>
        *   <p class="s-typo:p s-mbe:30">
        *       Text format mean that all the \`input[type="radio"\` tags inside the \`s-format:text\` class scope will be **styled automatically** using the default style and color.
        *   </p>
        *   <div class="s-format:text">
        *     <input type="radio" />
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    finalParams.styles.forEach((style) => {
        let cls = `s-radio`;
        if (style !== finalParams.defaultStyle) {
            cls += `--${style}`;
        }

        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.radio
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" radio
        * 
        * @example        html
        * <input type="radio" class="s-radio${
            style === finalParams.defaultStyle ? '' : `:${style}`
        }" value="something" name="myRadioItem1" />
        * <input type="radio" class="s-radio${
            style === finalParams.defaultStyle ? '' : `:${style}`
        }" value="something" name="myRadioItem2" />
        <input type="radio" class="s-radio${
            style === finalParams.defaultStyle ? '' : `:${style}`
        }" value="something" name="myRadioItem3" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .${cls} {
            @sugar.ui.radio($style: ${style});
        }
        `);
    });

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.push(`/**
            * @name           s-format:text input[type="radio"]
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent a simple input[type="radio"] tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <input type="radio" name="my-radio" checked />
            *   <input type="radio" name="my-radio" />
            *   <input type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.format.text {
                input[type="radio"] {
                    @sugar.color(${finalParams.defaultColor});
                    @sugar.ui.radio($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `);
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.push(`/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.radio
            * @type           CssClass
            * 
            * This class represent some input[type="radio"] in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input class="s-radio" type="radio" name="my-radio" checked />
            *   <input class="s-radio" type="radio" name="my-radio" />
            *   <input class="s-radio" type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.rhythm.vertical {
                input[type="radio"], .s-radio {
                    ${jsObjectToCssProperties(
                        __theme().config('ui.radio.rhythmVertical'),
                    )}
                } 
            }
        `);
    }

    replaceWith(vars);
}
