import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

class postcssSugarPluginUiFormSelectClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            default: ['solid'],
        },
        defaultColor: {
            type: 'String',
            default: __STheme.config('ui.select.defaultColor'),
        },
        defaultStyle: {
            type: 'String',
            values: ['solid'],
            default: __STheme.config('ui.select.defaultStyle'),
        },
        scope: {
            type: {
                type: 'Array<String>',
                splitChars: [',', ' '],
            },
            values: ['bare', 'lnf', 'tf', 'vr'],
            default: ['bare', 'lnf', 'tf', 'vr'],
        },
    };
}

export interface IPostcssSugarPluginUiFormSelectClassesParams {
    styles: 'solid'[];
    defaultColor: string;
    defaultStyle: 'solid';
    scope: ('bare' | 'lnf' | 'tf' | 'vr')[];
}

export { postcssSugarPluginUiFormSelectClassesInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormSelectClassesParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormSelectClassesParams = {
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
        * @name          Select
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/select
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice select in your forms
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
                return ` * @cssClass     s-select${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} select style`;
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
            *     <select class="s-select s-width:40" name="select-style-${style}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <select class="s-select s-color:accent s-width:40" name="select-style-${style}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <select class="s-select s-color:accent s-width:40" name="select-style-${style}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
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
        *     <select class="s-select s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-complementary">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <select class="s-select s-color:complementary s-width:40" name="select-color-error">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <select class="s-select s-color:error s-width:40" name="select-color-error" disabled>
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- Multiple -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Multiple</h3>
        *   <label class="s-mbe:30 s-label">
        *     <select class="s-select s-color:accent s-width:40" multiple name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- RTL -->
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">RTL Support</h3>
        *   <label class="s-mbe:30 s-label">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scale</h3>
        *   <label class="s-mbe:30 s-label s-scale:07">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:13">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- Text format -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Text format</h3>
        *   <p class="s-typo:p s-mbe:30">
        *       Text format mean that all the \`select\` tags inside the \`s-format:text\` class scope will be **styled automatically** using the default style and color.
        *   </p>
        *   <div class="s-format:text">
        *     <select class="s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    finalParams.styles.forEach((style) => {
        const isDefaultStyle =
            __STheme.config('ui.select.defaultStyle') === style;

        const styleCls = isDefaultStyle ? '' : `.s-select--${style}`;
        const cls = `.s-select${styleCls}`;

        vars.push(`/**
        * @name           s-select${isDefaultStyle ? '' : `:${style}`}
        * @namespace      sugar.css.ui.select
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" select
        * 
        * @example        html
        * <select class="s-select${isDefaultStyle ? '' : `:${style}`}">
        *   <option value="value 1">Hello</option>
        *   <option value="value 2">World</option>
        * </select>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
        vars.push(`
            ${cls} {
                @sugar.color(${finalParams.defaultColor});
                @sugar.ui.select($style: ${style}, $scope: '${finalParams.scope.join(
            ',',
        )}');
            }`);
    });

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.push(`/**
            * @name           s-format:text select
            * @namespace      sugar.css.ui.select
            * @type           CssClass
            * 
            * This class represent a simple select tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <select>
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *   </select>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.format.text {
                select {
                    @sugar.color(${finalParams.defaultColor});
                    @sugar.ui.select($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `);
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.push(`/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.select
            * @type           CssClass
            * 
            * This class represent some select in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <select class="s-select">
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *   </select>
            *   <select class="s-select">
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *   </select>
            *   <select class="s-select">
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *   </select>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.rhythm.vertical {
                select, .s-select {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.config('ui.select.rhythmVertical'),
                    )}
                } 
            }
        `);
    }

    replaceWith(vars);
}
