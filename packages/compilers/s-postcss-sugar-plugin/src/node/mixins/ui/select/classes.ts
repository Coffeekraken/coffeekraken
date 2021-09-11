import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';

class postcssSugarPluginUiFormSelectClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            default: ['solid'],
        },
        defaultStyle: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.select.defaultStyle'),
        },
    };
}

export interface IPostcssSugarPluginUiFormSelectClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
}

export { postcssSugarPluginUiFormSelectClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormSelectClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormSelectClassesParams = {
        styles: ['solid'],
        defaultStyle: 'solid',
        ...params,
    };

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
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-select${
                    style === finalParams.defaultStyle ? '' : `\:${style}`
                }           Apply the ${style} select style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-font\:30 s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">${style} style</h3>
            *   <label class="s-mb\:30 s-ui\:accent s-label">
            *     <select class="s-select" name="select-style-${style}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mb\:30 s-ui\:accent s-label">
            *     <select class="s-select" name="select-style-${style}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mb\:30 s-ui\:accent s-label">
            *     <select class="s-select" name="select-style-${style}">
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
        * <div class="s-font\:30 s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Colors</h3>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <select class="s-select" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:complementary s-label">
        *     <select class="s-select" name="select-color-complementary">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:error s-label">
        *     <select class="s-select" name="select-color-error">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-label">
        *     <select class="s-select" name="select-color-error" disabled>
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- RTL -->
        * <div class="s-font\:30 s-mb\:50" dir="rtl">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">RTL Support</h3>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <select class="s-select" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <select class="s-select" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <select class="s-select" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-font\:30 s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Scale</h3>
        *   <label class="s-mb\:30 s-ui\:accent s-label s-scale\:07">
        *     <select class="s-select" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <select class="s-select" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label s-scale\:13">
        *     <select class="s-select" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    finalParams.styles.forEach((style) => {
        const isDefaultStyle = __theme().config('ui.select.defaultStyle') === style;

        const styleCls = isDefaultStyle ? '' : `.s-select--${style}`;
        const cls = `.s-select${styleCls}`;

        vars.push(`/**
        * @name           s-select${isDefaultStyle ? '' : `\:${style}`}
        * @namespace      sugar.css.ui.select
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" select
        * 
        * @example        html
        * <select class="s-select${isDefaultStyle ? '' : `\:${style}`}">
        *   <option value="value 1">Hello</option>
        *   <option value="value 2">World</option>
        * </select>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
        vars.push([`${cls} {`, ` @sugar.ui.select($style: ${style});`, `}`].join('\n'));
    });

    replaceWith(vars);
}
