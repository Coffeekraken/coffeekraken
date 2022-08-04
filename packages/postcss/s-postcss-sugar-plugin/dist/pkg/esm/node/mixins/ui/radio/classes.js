import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name          classes
 * @namespace     node.mixin.ui.radio
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the radio classes
 *
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'circle')[]}             [shape=['default','square','circle']]         The shape(s) you want to generate
 * @param       {'solid'}                [defaultStyle='theme.ui.radio.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'circle'}        [defaultShape='theme.ui.radio.defaultShape']           The default shape you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.radio.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiRadioClassesInterface extends __SInterface {
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
                default: __STheme.get('ui.radio.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'circle'],
                default: __STheme.get('ui.radio.defaultShape'),
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
export { postcssSugarPluginUiRadioClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/radio.js`],
    };
}
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Radio
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/radio
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice radio in your forms
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
        return ` * @cssClass     s-radio${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} radio style`;
    })
        .join('\n')}
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-radio${shape === finalParams.defaultShape ? '' : `:${shape}`}           Apply the ${shape} radio shape`;
    })
        .join('\n')}
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label">
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *     <input type="radio" checked class="s-radio" name="radio-style-${style}" value="hello 1" checked />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <span>I'm disabled</span>
            *     <input type="radio" disabled class="s-radio" name="radio-style-${style}" value="hello 3" />
            *   </label>
            * `;
    })
        .join('\n')}
        *
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html       ${shape} shape
            *   <label class="s-mbe:30 s-label">
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
            *     <input type="radio" checked class="s-radio${finalParams.defaultShape === shape ? '' : `:${shape}`}" name="radio-shape-${shape}" value="hello 1" checked />
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <span>I'm disabled</span>
            *     <input type="radio" disabled class="s-radio${finalParams.defaultShape === shape ? '' : `:${shape}`}" name="radio-shape-${shape}" value="hello 1" />
            *   </label>
            * `;
    })
        .join('\n')}
        * 
        * @example        html          Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="radio" checked class="s-radio" name="radio-style-color" value="hello 1" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-color" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="radio" class="s-radio s-color:complementary" name="radio-style-color" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>I'm disabled</span>
        *     <input type="radio" disabled class="s-radio s-color:error" name="radio-style-color" value="hello 4" />
        *   </label>
        * 
        * @example        html          RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-ltr" value="hello 1" checked />
        *   </label>
        * </div>
        * 
        * @example        html          Scales
        *   <label class="s-mbe:30 s-label s-scale:07">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="radio" checked class="s-radio s-color:accent" name="radio-style-scale" value="hello 1" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 2" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:13">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale:16">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="radio" class="s-radio s-color:accent" name="radio-style-scale" value="hello 3" />
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-radio
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio" value="something" name="myRadioItem2" />
            * <input type="radio" class="s-radio" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-radio {
                @sugar.ui.radio($scope: bare);
            }
            `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            let cls = `s-radio`;
            if (style !== finalParams.defaultStyle) {
                cls += `--${style}`;
            }
            vars.comment(() => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${style}</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio${style === finalParams.defaultStyle ? '' : `:${style}`}" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio${style === finalParams.defaultStyle ? '' : `:${style}`}" value="something" name="myRadioItem2" />
            <input type="radio" class="s-radio${style === finalParams.defaultStyle ? '' : `:${style}`}" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls} {
                @sugar.ui.radio($style: ${style}, $scope: lnf);
            }
            `, {
                type: 'CssClass',
            });
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            let cls = `s-radio`;
            if (shape !== finalParams.defaultShape) {
                cls += `--${shape}`;
            }
            vars.comment(() => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${shape}</s-color>" radio
            * 
            * @example        html
            * <input type="radio" class="s-radio${shape === finalParams.defaultShape ? '' : `:${shape}`}" value="something" name="myRadioItem1" />
            * <input type="radio" class="s-radio${shape === finalParams.defaultShape ? '' : `:${shape}`}" value="something" name="myRadioItem2" />
            <input type="radio" class="s-radio${shape === finalParams.defaultShape ? '' : `:${shape}`}" value="something" name="myRadioItem3" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .${cls} {
                @sugar.ui.radio($shape: ${shape}, $scope: shape);
            }
            `, {
                type: 'CssClass',
            });
        });
    }
    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(() => `/**
            * @name           s-format:text input[type="radio"]
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent a simple input[type="radio"] tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <input type="radio" name="my-radio" checked />
            *   <input type="radio" name="my-radio" />
            *   <input type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.format.text {
                input[type="radio"] {
                    @sugar.ui.radio($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.radio
            * @type           CssClass
            * 
            * This class represent some input[type="radio"] in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input class="s-radio" type="radio" name="my-radio" checked />
            *   <input class="s-radio" type="radio" name="my-radio" />
            *   <input class="s-radio" type="radio" name="my-radio" />
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                input[type="radio"], .s-radio {
                    ${__STheme.jsObjectToCssProperties(__STheme.get('ui.radio.rhythmVertical'))}
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0seUNBQTBDLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO2FBQzNDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ2pEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7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