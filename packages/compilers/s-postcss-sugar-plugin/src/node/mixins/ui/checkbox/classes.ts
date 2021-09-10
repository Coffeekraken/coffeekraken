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
        defaultStyle: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.checkbox.defaultStyle'),
        },
    };
}

export interface IPostcssSugarPluginUiCheckboxClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
}

export { postcssSugarPluginUiCheckboxClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiCheckboxClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiCheckboxClassesParams = {
        styles: ['solid'],
        defaultStyle: 'solid',
        ...params,
    };

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
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-checkbox${
                    style === finalParams.defaultStyle ? '' : `\:${style}`
                }           Apply the ${style} checkbox style`;
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
            *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-${style}-1" value="hello 1" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mb\:30 s-ui\:accent s-label">
            *     <input type="checkbox" class="s-checkbox" name="checkbox-style-${style}-2" value="hello 2" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mb\:30 s-ui\:accent s-label">
            *     <input type="checkbox" class="s-checkbox" name="checkbox-style-${style}-3" value="hello 3" />
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
        *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-color-1" value="hello 1" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:info s-label">
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-color-2" value="hello 2" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:error s-label">
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-color-3" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:warning s-label">
        *     <input type="checkbox" disabled class="s-checkbox" name="checkbox-style-color-4" value="hello 4" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- LTR -->
        * <div class="s-font\:30 s-mb\:50" dir="rtl">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">LTR Support</h3>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-ltr-1" value="hello 1" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-ltr-2" value="hello 2" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-ltr-3" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-font\:30 s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Scale</h3>
        *   <label class="s-mb\:30 s-ui\:accent s-label s-scale\:07">
        *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-ltr-1" value="hello 1" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label">
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-ltr-2" value="hello 2" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mb\:30 s-ui\:accent s-label s-scale\:13">
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-ltr-3" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
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
            style === finalParams.defaultStyle ? '' : `\:${style}`
        }" value="something" name="mycheckboxItem1" />
        * <input type="checkbox" class="s-checkbox${
            style === finalParams.defaultStyle ? '' : `\:${style}`
        }" value="something" name="mycheckboxItem2" />
        <input type="checkbox" class="s-checkbox${
            style === finalParams.defaultStyle ? '' : `\:${style}`
        }" value="something" name="mycheckboxItem3" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .${cls} {
            @sugar.ui.checkbox($style: ${style});
        }
        `);
    });

    replaceWith(vars);
}
