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
    };
}

export interface IPostcssSugarPluginUiRangeClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
}

export { postcssSugarPluginUiRadioClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiRangeClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiRangeClassesParams = {
        styles: ['solid'],
        defaultStyle: 'solid',
        ...params,
    };

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
            *   <h3 class="s-color:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <label class="s-mbe:30 s-ui\:accent s-label">
            *     <input type="radio" class="s-radio" name="radio-style-${style}" value="hello 1" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-ui\:accent s-label">
            *     <input type="radio" class="s-radio" name="radio-style-${style}" value="hello 2" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            *   <label class="s-mbe:30 s-ui\:accent s-label">
            *     <input type="radio" class="s-radio" name="radio-style-${style}" value="hello 3" />
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *   </label>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * <!-- Colors -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">Colors</h3>
        *   <label class="s-mbe:30 s-ui\:accent s-label">
        *     <input type="radio" class="s-radio" name="radio-style-color" value="hello 1" checked="checked" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-ui\:info s-label">
        *     <input type="radio" class="s-radio" name="radio-style-color" value="hello 2" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-ui\:error s-label">
        *     <input type="radio" class="s-radio" name="radio-style-color" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-ui\:warning s-label">
        *     <input type="radio" disabled class="s-radio" name="radio-style-color" value="hello 4" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- LTR -->
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">LTR Support</h3>
        *   <label class="s-mbe:30 s-ui\:accent s-label">
        *     <input type="radio" class="s-radio" name="radio-style-ltr" value="hello 1" checked="checked" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-ui\:accent s-label">
        *     <input type="radio" class="s-radio" name="radio-style-ltr" value="hello 2" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-ui\:accent s-label">
        *     <input type="radio" class="s-radio" name="radio-style-ltr" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">Scale</h3>
        *   <label class="s-mbe:30 s-ui\:accent s-label s-scale\:07">
        *     <input type="radio" class="s-radio" name="radio-style-scale" value="hello 1" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-ui\:accent s-label">
        *     <input type="radio" class="s-radio" name="radio-style-scale" value="hello 2" checked="checked" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
        *   <label class="s-mbe:30 s-ui\:accent s-label s-scale\:13">
        *     <input type="radio" class="s-radio" name="radio-style-scale" value="hello 3" />
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *   </label>
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

    replaceWith(vars);
}
