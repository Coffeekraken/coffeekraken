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
 * @namespace     node.mixin.ui.checkbox
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the checkbox classes
 *
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'circle')[]}             [shape=['default','square','circle']]         The shape(s) you want to generate
 * @param       {'solid'}                [defaultStyle='theme.ui.button.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'circle'}        [defaultShape='theme.ui.button.defaultShape']           The default shape you want
 * @param       {String}                            [defaultColor=theme.ui.button.defaultColor]            The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * \@sugar.ui.checkbox.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiCheckboxClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'circle'],
                default: ['default', 'square', 'circle'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.get('ui.checkbox.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'circle'],
                default: s_theme_1.default.get('ui.checkbox.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('color')),
                default: s_theme_1.default.get('ui.checkbox.defaultColor'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'tf', 'vr'],
                default: ['bare', 'lnf', 'shape', 'tf', 'vr'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiCheckboxClassesInterface;
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
function dependencies() {
    return {
        files: [`${(0, dirname_1.default)()}/checkbox.js`],
    };
}
exports.dependencies = dependencies;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], shapes: ['default', 'square', 'circle'], defaultStyle: 'solid', defaultShape: 'default', defaultColor: 'main', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Checkbox
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/checkbox
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice checkbox in your forms
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
        return ` * @cssClass     s-checkbox${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} checkbox style`;
    })
        .join('\n')}
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-checkbox${shape === finalParams.defaultShape ? '' : `:${shape}`}           Apply the ${shape} checkbox shape`;
    })
        .join('\n')}
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style}
            *   <label class="s-mbe:30 s-label">
            *     ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
            *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-${style}-1" value="hello 1" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <span>I'm disabled</span>
            *     <input type="checkbox" disabled class="s-checkbox s-color:accent" name="checkbox-style-${style}-3" value="hello 3" />
            *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @example      html       Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-checkbox s-color:accent" name="checkbox-style-color-2" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-checkbox s-color:complementary" name="checkbox-style-color-3" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>I'm disabled</span>
        *     <input type="checkbox" disabled class="s-checkbox s-color:error" name="checkbox-style-color-4" value="hello 4" />
        *   </label>
        * 
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html       ${shape}
            *   <label class="s-mbe:30 s-label">
            *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
            *     <input type="checkbox" checked class="s-checkbox:${shape}" name="checkbox-shape-${shape}-1" value="hello 1" />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <span>I'm disabled</span>
            *     <input type="checkbox" disabled class="s-checkbox:${shape}" name="checkbox-shape-${shape}-3" value="hello 3" />
            *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @example          html        RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-ltr-1" value="hello 1" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>I'm disabled</span>
        *     <input type="checkbox" disabled class="s-checkbox" name="checkbox-style-ltr-3" value="hello 3" />
        *   </label>
        * </div>
        * 
        * @example          html        Scales
        *   <label class="s-mbe:30 s-label s-scale:07">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-ltr-1" value="hello 1" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-ltr-2" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:13">
        *     <span>${faker_1.default.name.title()} ${faker_1.default.name.findName()}</span>
        *     <input type="checkbox" class="s-checkbox" name="checkbox-style-ltr-3" value="hello 3" />
        *   </label>
        * 
        * @example      html        Vertical rhythm / Text format
        *   <div class="s-format:text">
        *     <input type="checkbox" />
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-checkbox
            * @namespace          sugar.style.ui.checkbox
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" checkbox
            * 
            * @example        html
            * <input type="checkbox" class="s-checkbox" value="something" name="mycheckboxItem1" />
            * <input type="checkbox" class="s-checkbox" value="something" name="mycheckboxItem2" />
            * <input type="checkbox" class="s-checkbox" value="something" name="mycheckboxItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-checkbox {
                @sugar.ui.checkbox($scope: bare);
            }
            `, {
            type: 'CssClass',
        });
    }
    finalParams.styles.forEach((style) => {
        let cls = `s-checkbox`;
        if (style !== finalParams.defaultStyle) {
            cls += `--${style}`;
        }
        vars.comment(() => `/**
        * @name           ${cls}
        * @namespace          sugar.style.ui.checkbox
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" checkbox
        * 
        * @example        html
        * <input type="checkbox" class="s-checkbox${style === finalParams.defaultStyle ? '' : `:${style}`}" value="something" name="mycheckboxItem1" />
        * <input type="checkbox" class="s-checkbox${style === finalParams.defaultStyle ? '' : `:${style}`}" value="something" name="mycheckboxItem2" />
        <input type="checkbox" class="s-checkbox${style === finalParams.defaultStyle ? '' : `:${style}`}" value="something" name="mycheckboxItem3" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .${cls} {
            @sugar.ui.checkbox($style: ${style}, $scope: lnf);
        }
        `, {
            type: 'CssClass',
        });
    });
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            let cls = `s-checkbox`;
            if (shape !== finalParams.defaultShape) {
                cls += `--${shape}`;
            }
            vars.comment(() => `/**
                * @name           ${cls}
                * @namespace          sugar.style.ui.checkbox
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${shape}</s-color>" checkbox
                * 
                * @example        html
                * <input type="checkbox" class="s-checkbox${shape === finalParams.defaultShape ? '' : `:${shape}`}" value="something" name="mycheckboxItem1" />
                * <input type="checkbox" class="s-checkbox${shape === finalParams.defaultShape ? '' : `:${shape}`}" value="something" name="mycheckboxItem2" />
                <input type="checkbox" class="s-checkbox${shape === finalParams.defaultShape ? '' : `:${shape}`}" value="something" name="mycheckboxItem3" />
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .${cls} {
                @sugar.ui.checkbox($shape: ${shape}, $scope: shape);
            }
        `, {
                type: 'CssClass',
            });
        });
    }
    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(() => `
            .s-checkbox:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `, { type: 'CssClass' });
    }
    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(() => `/**
            * @name           s-format:text
            * @namespace          sugar.style.ui.checkbox
            * @type           CssClass
            * 
            * This class represent a simple input[type="checkbox"] tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <input type="checkbox" checked />
            *   <input type="checkbox" checked />
            *   <input type="checkbox" checked />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                input[type="checkbox"] {
                    @sugar.ui.checkbox($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.checkbox
            * @type           CssClass
            * 
            * This class represent some input[type="checkbox"] in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input class="s-checkbox" type="checkbox" checked />
            *   <input class="s-checkbox" type="checkbox" checked />
            *   <input class="s-checkbox" type="checkbox" checked />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                input[type="checkbox"], .s-checkbox {
                    ${s_theme_1.default.jsObjectToCssProperties(s_theme_1.default.get('ui.checkbox.rhythmVertical'))}
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sNENBQTZDLFNBQVEscUJBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUN2QyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQzthQUMzQztZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQzthQUNwRDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDdkMsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2FBQ3BEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7YUFDcEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2dCQUM1QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO2FBQ2hEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVd3RCxpRUFBUztBQUVsRSxrRkFBNEQ7QUFDNUQsU0FBZ0IsWUFBWTtJQUN4QixPQUFPO1FBQ0gsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFBLGlCQUFTLEdBQUUsY0FBYyxDQUFDO0tBQ3hDLENBQUM7QUFDTixDQUFDO0FBSkQsb0NBSUM7QUFFRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNqQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUN2QyxZQUFZLEVBQUUsT0FBTyxFQUNyQixZQUFZLEVBQUUsU0FBUyxFQUN2QixZQUFZLEVBQUUsTUFBTSxFQUNwQixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBbUJKLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLDhCQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RCx3QkFBd0IsS0FBSyxpQkFBaUIsQ0FBQztJQUNuRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDO1VBQ2IsV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sOEJBQ0gsS0FBSyxLQUFLLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQ3ZELHdCQUF3QixLQUFLLGlCQUFpQixDQUFDO0lBQ25ELENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7O1VBRWIsV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8saUNBQWlDLEtBQUs7O29CQUV6QyxlQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzJGQUN3QixLQUFLOzs7OzJHQUlXLEtBQUs7O2VBRWpHLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O3NCQUlELGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7c0JBSS9DLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7O1VBUTNELFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLGlDQUFpQyxLQUFLOzswQkFFbkMsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtxRUFDSixLQUFLLDBCQUEwQixLQUFLOzs7O3NFQUluQyxLQUFLLDBCQUEwQixLQUFLOztlQUUzRixDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7c0JBS0QsZUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7c0JBVy9DLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7c0JBSS9DLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7c0JBSS9DLGVBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztLQVloRSxDQUNBLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7OztRQWVWLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7Ozs7YUFJQyxFQUNEO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2pDLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQztRQUN2QixJQUFJLEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxFQUFFO1lBQ3BDLEdBQUcsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs0QkFDVSxHQUFHOzs7O3lEQUkwQixLQUFLOzs7b0RBSWxELEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RDtvREFFSSxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQ7a0RBRUksS0FBSyxLQUFLLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQ3ZEOzs7OztNQUtGLENBQ0csQ0FBQyxJQUFJLENBQ0Y7V0FDRCxHQUFHO3lDQUMyQixLQUFLOztTQUVyQyxFQUNHO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3JDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakMsSUFBSSxHQUFHLEdBQUcsWUFBWSxDQUFDO1lBQ3ZCLElBQUksS0FBSyxLQUFLLFdBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BDLEdBQUcsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO2FBQ3ZCO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztvQ0FDYyxHQUFHOzs7O2lFQUkwQixLQUFLOzs7NERBSWxELEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RDs0REFFSSxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQ7MERBRUksS0FBSyxLQUFLLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQ3ZEOzs7OztZQUtKLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7ZUFDRCxHQUFHOzZDQUMyQixLQUFLOztTQUV6QyxFQUNPO2dCQUNJLElBQUksRUFBRSxVQUFVO2FBQ25CLENBQ0osQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxnQkFBZ0I7SUFDaEIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsRUFBRSxDQUFDOzsrQkFFYSxXQUFXLENBQUMsWUFBWTs7U0FFOUMsRUFDRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztLQUNMO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztRQWlCVixDQUNDLENBQUMsSUFBSSxDQUNGOzs7a0RBR3NDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNoRCxHQUFHLENBQ047OztTQUdaLEVBQ0c7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQW1CVixDQUNDLENBQUMsSUFBSSxDQUNGOzs7c0JBR1UsaUJBQVEsQ0FBQyx1QkFBdUIsQ0FDOUIsaUJBQVEsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FDN0M7OztTQUdaLEVBQ0c7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7S0FDTDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFwVkQsNEJBb1ZDIn0=