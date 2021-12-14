import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
class postcssSugarPluginUiCheckboxClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill', 'circle'],
                default: ['default', 'square', 'pill', 'circle'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.checkbox.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill', 'circle'],
                default: __STheme.config('ui.checkbox.defaultShape'),
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
export { postcssSugarPluginUiCheckboxClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/checkbox.js`],
    };
}
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], shapes: ['default', 'square', 'pill', 'circle'], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
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
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <label class="s-mbe:30 s-label">
            *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-${style}-1" value="hello 1" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="checkbox" class="s-checkbox s-color:accent" name="checkbox-style-${style}-2" value="hello 2" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="checkbox" class="s-checkbox s-color:accent" name="checkbox-style-${style}-3" value="hello 3" />
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
        *     <input type="checkbox" checked class="s-checkbox" name="checkbox-style-color-1" value="hello 1" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" class="s-checkbox s-color:accent" name="checkbox-style-color-2" value="hello 2" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" class="s-checkbox s-color:complementary" name="checkbox-style-color-3" value="hello 3" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" disabled class="s-checkbox s-color:error" name="checkbox-style-color-4" value="hello 4" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        * </div>
        * 
        * <!-- shapes -->
        ${finalParams.shapes
        .map((shape) => {
        return ` * <!-- ${shape} shape -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${shape} shape</h3>
            *   <label class="s-mbe:30 s-label">
            *     <input type="checkbox" checked class="s-checkbox:${shape}" name="checkbox-shape-${shape}-1" value="hello 1" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="checkbox" class="s-checkbox:${shape} s-color:accent" name="checkbox-shape-${shape}-2" value="hello 2" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="checkbox" class="s-checkbox:${shape} s-color:accent" name="checkbox-shape-${shape}-3" value="hello 3" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * <!-- LTR -->
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">LTR Support</h3>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" checked class="s-checkbox s-color:accent" name="checkbox-style-ltr-1" value="hello 1" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" class="s-checkbox s-color:accent" name="checkbox-style-ltr-2" value="hello 2" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" class="s-checkbox s-color:accent" name="checkbox-style-ltr-3" value="hello 3" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scale</h3>
        *   <label class="s-mbe:30 s-label s-scale:07">
        *     <input type="checkbox" checked class="s-checkbox s-color:accent" name="checkbox-style-ltr-1" value="hello 1" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="checkbox" class="s-checkbox s-color:accent" name="checkbox-style-ltr-2" value="hello 2" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:13">
        *     <input type="checkbox" class="s-checkbox s-color:accent" name="checkbox-style-ltr-3" value="hello 3" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        * </div>
        * 
        * <!-- Text format -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Text format</h3>
        *   <p class="s-typo:p s-mbe:30">
        *       Text format mean that all the \`input[type="checkbox"\` tags inside the \`s-format:text\` class scope will be **styled automatically** using the default style and color.
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
    if (finalParams.scope.includes('bare')) {
        vars.push(`/**
            * @name           s-checkbox
            * @namespace      sugar.css.ui.checkbox
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
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            .s-checkbox {
                @sugar.ui.checkbox($scope: bare);
            }
            `);
    }
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
        * <input type="checkbox" class="s-checkbox${style === finalParams.defaultStyle ? '' : `:${style}`}" value="something" name="mycheckboxItem1" />
        * <input type="checkbox" class="s-checkbox${style === finalParams.defaultStyle ? '' : `:${style}`}" value="something" name="mycheckboxItem2" />
        <input type="checkbox" class="s-checkbox${style === finalParams.defaultStyle ? '' : `:${style}`}" value="something" name="mycheckboxItem3" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .${cls} {
            @sugar.ui.checkbox($style: ${style}, $scope: lnf);
        }
        `);
    });
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            let cls = `s-checkbox`;
            if (shape !== finalParams.defaultShape) {
                cls += `--${shape}`;
            }
            vars.push(`/**
                * @name           ${cls}
                * @namespace      sugar.css.ui.checkbox
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
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
            .${cls} {
                @sugar.ui.checkbox($shape: ${shape}, $scope: shape);
            }
        `);
        });
    }
    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.push(`/**
            * @name           s-format:text
            * @namespace      sugar.css.ui.checkbox
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.format.text {
                input[type="checkbox"] {
                    @sugar.ui.checkbox($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `);
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.push(`/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.checkbox
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
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
            @sugar.rhythm.vertical {
                input[type="checkbox"], .s-checkbox {
                    ${__STheme.jsObjectToCssProperties(__STheme.config('ui.checkbox.rhythmVertical'))}
                } 
            }
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO2dCQUMvQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7YUFDbkQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQzthQUN2RDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7Z0JBQy9DLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDO2FBQ3ZEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7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