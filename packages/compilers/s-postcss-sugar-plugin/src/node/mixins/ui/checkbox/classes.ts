import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';

class postcssSugarPluginUiCheckboxClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            values: ['solid'],
            default: ['solid'],
        },
        defaultColor: {
            type: 'String',
            default: __theme().config('ui.checkbox.defaultColor'),
        },
        defaultStyle: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.checkbox.defaultStyle'),
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

export interface IPostcssSugarPluginUiCheckboxClassesParams {
    styles: 'solid'[];
    defaultColor: string;
    defaultStyle: 'solid';
    scope: ('bare' | 'lnf' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiCheckboxClassesInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiCheckboxClassesParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiCheckboxClassesParams = {
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
        * @name          Checkbox
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/checkbox
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice checkbox in your forms
        * 
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
                return ` * @cssClass     s-checkbox${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} checkbox style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-color:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <label class="s-mbe:30 s-label">
            *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-${style}-1" value="hello 1" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="checkbox" class="s-checkbox s-ui:accent" name="checkbox-style-${style}-2" value="hello 2" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="checkbox" class="s-checkbox s-ui:accent" name="checkbox-style-${style}-3" value="hello 3" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * <!-- Colors -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">Colors (non-exhaustive)</h3>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-color-1" value="hello 1" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" class="s-checkbox s-ui:accent" name="checkbox-style-color-2" value="hello 2" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" class="s-checkbox s-ui:complementary" name="checkbox-style-color-3" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" disabled class="s-checkbox s-ui:error" name="checkbox-style-color-4" value="hello 4" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- LTR -->
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">LTR Support</h3>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" checked class="s-checkbox s-ui:accent" name="checkbox-style-ltr-1" value="hello 1" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" class="s-checkbox s-ui:accent" name="checkbox-style-ltr-2" value="hello 2" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" class="s-checkbox s-ui:accent" name="checkbox-style-ltr-3" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">Scale</h3>
        *   <label class="s-mbe:30 s-label s-scale:07">
        *     <input type="checkbox" checked class="s-checkbox s-ui:accent" name="checkbox-style-ltr-1" value="hello 1" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" class="s-checkbox s-ui:accent" name="checkbox-style-ltr-2" value="hello 2" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:13">
        *     <input type="checkbox" class="s-checkbox s-ui:accent" name="checkbox-style-ltr-3" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- Text format -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">Text format</h3>
        *   <p class="s-typo:p s-mbe:30">
        *       Text format mean that all the "input[type="chockbox"" tags inside the "s-format:text" class scope will be styled automatically using the default style and color.
        *   </p>
        *   <div class="s-format:text">
        *     <input type="checkbox" />
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    finalParams.styles.forEach((style) => {
        let cls = `s-checkbox`;
        if (style !== finalParams.defaultStyle) {
            cls += `--${style}`;
        }

        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.checkbox
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" checkbox
        * 
        * @example        html
        * <input type="checkbox" class="s-checkbox${
            style === finalParams.defaultStyle ? '' : `:${style}`
        }" value="something" name="mycheckboxItem1" />
        * <input type="checkbox" class="s-checkbox${
            style === finalParams.defaultStyle ? '' : `:${style}`
        }" value="something" name="mycheckboxItem2" />
        <input type="checkbox" class="s-checkbox${
            style === finalParams.defaultStyle ? '' : `:${style}`
        }" value="something" name="mycheckboxItem3" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .${cls} {
            @sugar.color.remap(ui, ${finalParams.defaultColor});
            @sugar.ui.checkbox($style: ${style}, $scope: '${finalParams.scope.join(',')}');
        }
        `);
    });

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.push(`/**
            * @name           s-format:text input[type="checkbox"]
            * @namespace      sugar.css.ui.checkbox
            * @type           CssClass
            * 
            * This class represent a simple input[type="checkbox"] tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <input type="checkbox" checked /><span></span>
            *   <input type="checkbox" checked /><span></span>
            *   <input type="checkbox" checked /><span></span>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.format.text {
                input[type="checkbox"] {
                    @sugar.color.remap(ui, ${finalParams.defaultColor});
                    @sugar.ui.checkbox($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `);
    }

    replaceWith(vars);
}
