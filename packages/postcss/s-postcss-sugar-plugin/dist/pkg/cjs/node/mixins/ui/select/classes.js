"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependencies = exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
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
class postcssSugarPluginUiFormSelectClassesInterface extends s_interface_1.default {
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
                default: s_theme_1.default.get('ui.select.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: s_theme_1.default.get('ui.select.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('color')),
                default: s_theme_1.default.get('ui.select.defaultColor'),
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
exports.interface = postcssSugarPluginUiFormSelectClassesInterface;
const fs_1 = require("@coffeekraken/sugar/fs");
function dependencies() {
    return {
        files: [`${(0, fs_1.__dirname)()}/select.js`],
    };
}
exports.dependencies = dependencies;
function default_1({ params, atRule, CssVars, replaceWith, }) {
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
            *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
            *     <select class="s-select${finalParams.defaultStyle === style ? '' : `:${style}`} s-width:40" name="select-style-${style}">
            *       <option value="value1">${faker_1.default.name.findName()}</option>
            *       <option value="value2">${faker_1.default.name.findName()}</option>
            *       <option value="value3">${faker_1.default.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>I'm disabled</span>
            *     <select disabled class="s-select${finalParams.defaultStyle === style ? '' : `:${style}`} s-width:40" name="select-style-${style}">
            *       <option value="value1">${faker_1.default.name.findName()}</option>
            *       <option value="value2">${faker_1.default.name.findName()}</option>
            *       <option value="value3">${faker_1.default.name.findName()}</option>
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
            *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
            *     <select class="s-select${finalParams.defaultShape === shape ? '' : `:${shape}`} s-width:40" name="select-shape-${shape}">
            *       <option value="value1">${faker_1.default.name.findName()}</option>
            *       <option value="value2">${faker_1.default.name.findName()}</option>
            *       <option value="value3">${faker_1.default.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *    <span>I'm disabled</span>
            *     <select disabled class="s-select${finalParams.defaultShape === shape ? '' : `:${shape}`} s-width:40" name="select-shape-${shape}">
            *       <option value="value1">${faker_1.default.name.findName()}</option>
            *       <option value="value2">${faker_1.default.name.findName()}</option>
            *       <option value="value3">${faker_1.default.name.findName()}</option>
            *     </select>
            *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @example      html            Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <select class="s-select s-width:40" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-complementary">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <select class="s-select s-color:complementary s-width:40" name="select-color-error">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <select class="s-select s-color:error s-width:40" name="select-color-error" disabled>
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example      html            Multiple
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" multiple name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example          html            RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        * </div>
        * 
        * @example          html           Scales
        *   <label class="s-mbe:30 s-label:responsive s-scale:07">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:13">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:16">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${faker_1.default.name.findName()}</option>
        *       <option value="value2">${faker_1.default.name.findName()}</option>
        *       <option value="value3">${faker_1.default.name.findName()}</option>
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
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
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
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *   </select>
            *   <select class="s-select">
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *   </select>
            *   <select class="s-select">
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *       <option>${faker_1.default.name.findName()}</option>
            *   </select>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                select, .s-select {
                    ${s_theme_1.default.jsObjectToCssProperties(s_theme_1.default.get('ui.select.rhythmVertical'))}
                } 
            }
        `, { type: 'CssClass' });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sOENBQStDLFNBQVEscUJBQVk7SUFDckUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7YUFDekM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDbEQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUNsRDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQ2xEO1lBQ0QsS0FBSyxFQUFFO2dC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RTt5Q0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7c0JBSTFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7O3lDQUU1QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7O3NCQUkxQyxlQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzt5Q0FFNUIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O3NCQU0xQyxlQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzt5Q0FFNUIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7eUNBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztzQkFPMUMsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7eUNBRTVCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3lDQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5Q0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7c0JBTzFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7O3lDQUU1QixlQUFPLENBQUMsSUFBSSxDQUFDLFFB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