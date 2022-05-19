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
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
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
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <select class="s-select${finalParams.defaultStyle === style ? '' : `:${style}`} s-width:40" name="select-style-${style}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     I'm disabled
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
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <select class="s-select${finalParams.defaultShape === shape ? '' : `:${shape}`} s-width:40" name="select-shape-${shape}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     I'm disabled
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
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <select class="s-select s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <select class="s-select s-color:accent s-width:40" name="select-color-complementary">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <select class="s-select s-color:complementary s-width:40" name="select-color-error">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <select class="s-select s-color:error s-width:40" name="select-color-error" disabled>
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example      html            Multiple
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
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
        *     ${__faker.name.title()} ${__faker.name.findName()}
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
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:13">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:16">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     ${__faker.name.title()} ${__faker.name.findName()}
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
                }`);
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
                }`);
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
            }`);
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
        `);
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
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sOENBQStDLFNBQVEsWUFBWTtJQUNyRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQzthQUN6QztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQ2xEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUNsRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxL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