import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name          classes
 * @namespace     node.mixin.ui.select
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the select classes
 *
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill')[]}             [shape=['default','square','pill']]         The shape(s) you want to generate
 * @param       {'solid'}                [defaultStyle='theme.ui.select.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}        [defaultShape='theme.ui.select.defaultShape']           The default shape you want
 * @param       {String}                            [defaultColor=theme.ui.select.defaultColor]            The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.select.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFormSelectClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill'],
                default: ['default', 'square', 'pill'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.select.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.select.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.select.defaultColor'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'vr', 'tf'],
                default: ['bare', 'lnf', 'shape', 'vr', 'tf'],
            },
        };
    }
}
export { postcssSugarPluginUiFormSelectClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/select.js`],
    };
}
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', defaultColor: 'main', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Select
        * @namespace          sugar.style.ui
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
        return ` * @cssClass     s-select${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} select style`;
    })
        .join('\n')}
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-select${shape === finalParams.defaultShape ? '' : `:${shape}`}           Apply the ${shape} select shape`;
    })
        .join('\n')}
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *     <select class="s-select${finalParams.defaultStyle === style ? '' : `:${style}`} s-width:40" name="select-style-${style}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>I'm disabled</span>
            *     <select disabled class="s-select${finalParams.defaultStyle === style ? '' : `:${style}`} s-width:40" name="select-style-${style}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *   </label>
            * `;
    })
        .join('\n')}
        *
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html       ${shape} shape
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *     <select class="s-select${finalParams.defaultShape === shape ? '' : `:${shape}`} s-width:40" name="select-shape-${shape}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *    <span>I'm disabled</span>
            *     <select disabled class="s-select${finalParams.defaultShape === shape ? '' : `:${shape}`} s-width:40" name="select-shape-${shape}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @example      html            Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <select class="s-select s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-complementary">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <select class="s-select s-color:complementary s-width:40" name="select-color-error">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <select class="s-select s-color:error s-width:40" name="select-color-error" disabled>
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example      html            Multiple
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" multiple name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example          html            RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        * </div>
        * 
        * @example          html           Scales
        *   <label class="s-mbe:30 s-label:responsive s-scale:07">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:13">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:16">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-select
            * @namespace          sugar.style.ui.select
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>bare</yellow>" select
            * 
            * @example        html
            * <select class="s-select">
            *   <option value="value 1">Hello</option>
            *   <option value="value 2">World</option>
            * </select>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
        vars.code(() => `
                .s-select {
                    @sugar.ui.select($scope: bare);
                }`, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            const isDefaultStyle = finalParams.defaultStyle === style;
            const styleCls = isDefaultStyle ? '' : `.s-select--${style}`;
            const cls = `.s-select${styleCls}`;
            vars.comment(() => `/**
            * @name           s-select${isDefaultStyle ? '' : `:${style}`}
            * @namespace          sugar.style.ui.select
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
            vars.code(() => `
                ${cls} {
                    @sugar.ui.select($style: ${style}, $scope: lnf);
                }`, { type: 'CssClass' });
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            const isDefaultShape = finalParams.defaultShape === shape;
            const styleCls = isDefaultShape ? '' : `.s-select--${shape}`;
            const cls = `.s-select${styleCls}`;
            vars.comment(() => `/**
        * @name           s-select${isDefaultShape ? '' : `:${shape}`}
        * @namespace          sugar.style.ui.select
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${shape}</yellow>" select
        * 
        * @example        html
        * <select class="s-select${isDefaultShape ? '' : `:${shape}`}">
        *   <option value="value 1">Hello</option>
        *   <option value="value 2">World</option>
        * </select>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`);
            vars.code(() => `
            ${cls} {
                @sugar.ui.select($shape: ${shape}, $scope: shape);
            }`, { type: 'CssClass' });
        });
    }
    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(() => `/**
            * @name           s-format:text select
            * @namespace          sugar.style.ui.select
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                select {
                    @sugar.ui.select($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `, { type: 'CssClass' });
    }
    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(() => `
            .s-select:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `, { type: 'CssClass' });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.select
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                select, .s-select {
                    ${__STheme.jsObjectToCssProperties(__STheme.get('ui.select.rhythmVertical'))}
                } 
            }
        `, { type: 'CssClass' });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLDhDQUErQyxTQUFRLFlBQVk7SUFDckUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7YUFDekM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUNsRDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDbEQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxFQUFFLFFBQVEsQ0FB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Q0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzt5Q0FFNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OztzQkFJMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7eUNBRTVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7c0JBSTFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7O3lDQUU1QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7c0JBTTFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7O3lDQUU1QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7O3NCQU8xQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzt5Q0FFNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztzQkFP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